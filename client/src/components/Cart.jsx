import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Cart.module.css";
import Button from "./Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

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
  };

  const calculateTotal = useCallback(() => {
    if (cart !== null) {
      const total = cart.reduce((previousValue, product) => {
        const unitPrice = products.find((item) => {
          return item._id === product.productId;
        }).price;
        const subTotal = product.amount * unitPrice;
        return previousValue + subTotal;
      }, 0);
      setTotalPrice(total.toFixed(2));
    }
  }, [cart, products]);

  useEffect(() => {
    if (user && products) {
      setCart(user.cart);
      calculateTotal();
    }
  }, [user, products, calculateTotal]);

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
            <h5 className={styles.action}>Remove all</h5>
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
                <div className={styles.items}>2 items</div>
              </div>
              <div className={styles.total_amount}>${totalPrice}</div>
            </div>
            <div className={styles.button}>
              <Button type="primary" text="Checkout" />
            </div>
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
