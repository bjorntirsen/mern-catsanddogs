import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Cart.module.css";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { appPostRequest, appFetchCall, appDeleteCall } from "../utils/apiCalls";

export default function ShoppingCartPage() {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [productsNotAvailable, setProductsNotAvailable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [wasChanged, setWasChanged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    const url = `${process.env.REACT_APP_BASE_URL}/api/products`;
    appFetchCall(url)
      .then((responseData) => {
        if (isMounted) {
          setProducts(responseData.data.products);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setIsLoading(false);
          setErrorMessage(error.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const changeQuantityHandler = (productId, fn) => {
    //update product
    let indexOfProduct;
    const product = cart.find((item, index) => {
      indexOfProduct = index;
      return item.productId === productId;
    });
    const { amount } = product;
    const updatedProduct = product;
    updatedProduct.amount = fn(amount);
    // insert updated product in array
    let updatedCart = cart;
    updatedCart[indexOfProduct] = updatedProduct;
    setCart(updatedCart);
    calculateTotal();
    setWasChanged(true);
  };

  const calculateTotal = useCallback(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((previousValue, product) => {
        const unitPrice = products.find((item) => {
          return item._id === product.productId;
        }).price;
        const subTotal = product.amount * unitPrice;
        return previousValue + subTotal;
      }, 15);
      setTotalPrice(total.toFixed(2));
    }
  }, [cart, products]);

  useEffect(() => {
    if (user && products) {
      setCart(user.cart);
      calculateTotal();
    }
  }, [user, products, calculateTotal]);

  const handleSaveCart = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/carts/update`;
    const responseData = await appPostRequest(url, { updatedCart: cart });
    setUser(responseData.data.user);
    setWasChanged(false);
  };

  const addUnitPriceToCart = (oldCart) => {
    const updatedCart = oldCart.map((product) => {
      const unitPrice = products.find((item) => {
        return item._id === product.productId;
      }).price;
      product.unitPriceAtPurchase = unitPrice;
      return product;
    });
    return updatedCart;
  };

  const handleCreateOrder = async () => {
    const updatedCart = addUnitPriceToCart(cart);
    const url = `${process.env.REACT_APP_BASE_URL}/api/orders`;
    const cartItemsOverStock = updatedCart
      .map((item) => item.productId)
      .map((id) => {
        return products.filter((prodItem) => prodItem._id === id)[0];
      })
      .filter((prodItem, index) => prodItem.stock < updatedCart[index].amount);

    const isProdNotAvailable = cartItemsOverStock.length > 0;
    if (isProdNotAvailable) {
      console.log(updatedCart);
      setProductsNotAvailable(cartItemsOverStock);
      return -1;
    }

    const responseData = await appPostRequest(url, { content: updatedCart });
    setUser(responseData.data.user);
    history.push(`/orders/${responseData.data.order._id}`);
  };

  const handleRemoveAllClick = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/carts/emptyCart`;
    const responseData = await appDeleteCall(url);
    setUser(responseData.data.user);

    setCart(null);
    setTotalPrice(0);
  };

  if (isLoading) {
    return (
      <section className={styles.IsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (cart && cart.length === 0) {
    return (
      <section className={styles.body}>
        <p>Your Cart is Empty</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.ErrorMessage}>
        <p>{errorMessage}</p>
      </section>
    );
  }

  if (!isLoading && cart)
    return (
      <section className={styles.body}>
        <div className={styles.cart_container}>
          <div className={styles.header}>
            <h2>Shopping Cart</h2>
            <h5 onClick={handleRemoveAllClick} className={styles.action}>
              Remove all
            </h5>
          </div>

          {cart.map((product) => {
            const fullProduct = products.find((item) => {
              return item._id === product.productId;
            });
            return (
              <CartItem
                key={product.productId}
                setCart={setCart}
                setTotalPrice={setTotalPrice}
                product={fullProduct}
                amount={product.amount}
                changeQuantityHandler={changeQuantityHandler}
              />
            );
          })}

          <div className={styles.summary}>
            <div className={styles.total}>
              <div>
                <div className={styles.totalprice}>Total</div>
              </div>
              <div className={styles.total_amount}>${totalPrice}</div>
            </div>
            <div className={styles.items}>including $15 shipping</div>
            <div className={styles.button}>
              <Button
                type="primary"
                text="Checkout"
                onClick={handleCreateOrder}
              />
            </div>
            {wasChanged && (
              <div className={styles.button}>
                <Button
                  type="secondary"
                  text="Save cart"
                  onClick={handleSaveCart}
                />
              </div>
            )}
          </div>
          {productsNotAvailable &&
            productsNotAvailable.map((item) => {
              return (
                <div className={styles.ErrorMessage} key={item._id}>
                  <p>{item.title}: Not enough in stock</p>
                  <p>
                    Only {item.stock} unit
                    {item.stock > 1 ? <>s</> : <></>} left in stock
                  </p>
                  <p>Please update your cart.</p>
                </div>
              );
            })}
        </div>
      </section>
    );

  return (
    <section className={styles.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );
}
