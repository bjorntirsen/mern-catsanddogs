import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Cart.module.css";
import Button from "./Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [wasChanged, setWasChanged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setProducts(responseData.data.products);

      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
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
    const token = localStorage.getItem("tkn");
    const url = "/api/carts/update";
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updatedCart: cart }),
    };
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
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
    const token = localStorage.getItem("tkn");
    const url = "/api/orders";
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: updatedCart }),
    };
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    setUser(responseData.data.user);
    history.push(`/orders/${responseData.data.order._id}`);
  };

  const handleRemoveAllClick = async () => {
    const token = localStorage.getItem("tkn");
    const url = "/api/carts/emptyCart";
    const obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
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
        </div>
      </section>
    );

  return (
    <section className={styles.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );
};

export default Cart;
