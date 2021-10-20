import React from "react";

import Button from "./Button";

import styles from "../styles/Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  return (
    <section className={styles.body}>
      <div className={styles.cart_container}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <h5 className={styles.action}>Remove all</h5>
        </div>

        <CartItem />
        <CartItem />
        <CartItem />

        <div className={styles.summary}>
          <div className={styles.total}>
            <div>
              <div className={styles.totalprice}>Total</div>
              <div className={styles.items}>2 items</div>
            </div>
            <div className={styles.total_amount}>$8.98</div>
          </div>
          <div className={styles.button}>
            <Button type="primary" text="Checkout" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
