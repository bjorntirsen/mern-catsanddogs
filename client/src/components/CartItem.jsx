import React from "react";

import styles from "../styles/CartItem.module.css";

const CartItem = () => {
  return (
    <div className={styles.cart_items}>
      <div className={styles.image_box}>
        <img
          className={styles.img}
          src="https://static.zara.net/photos///2021/I/0/1/p/0653/289/712/2/w/1126/0653289712_2_1_1.jpg?ts=1632311345187"
          alt="product"
        />
      </div>
      <h1 className={styles.title}>Product Name</h1>
      <div className={styles.counter}>
        <div className={styles.btn}>+</div>
        <div className={styles.count}>1</div>
        <div className={styles.btn}>-</div>
      </div>
      <div className={styles.prices}>
        <div className={styles.amount}>$2.99</div>
        <div className={styles.remove}>Remove</div>
      </div>
    </div>
  );
};

export default CartItem;
