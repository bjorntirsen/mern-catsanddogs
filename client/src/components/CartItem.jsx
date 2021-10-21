import React, { useState } from "react";

import styles from "../styles/CartItem.module.css";

const CartItem = ({ product, amount, reduceQuantityHandler }) => {
  const [quantity, setQuantity] = useState(amount);

  // const reduceQuantityHandler = () => {
  //   quantity > 1 && setQuantity(quantity - 1);
  // };

  // const increaseQuantityHandler = () => {
  //   setQuantity(quantity + 1);
  // };

  // const onChangeHandler = (e) => {
  //   setQuantity(parseInt(e.target.value));
  // };

  const handleReduce = () => {
    reduceQuantityHandler(product._id);
    setQuantity(quantity - 1);
  };

  return (
    <div className={styles.cart_items}>
      <div className={styles.image_box}>
        <img
          className={styles.img}
          src={product.imageUrl}
          alt={product.title}
        />
      </div>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.counter}>
        <span className={styles.btn} onClick={handleReduce}>
          -
        </span>
        <input
          className={styles.count}
          type="number"
          name="qty_input"
          value={quantity}
          min="1"
        />
        <span className={styles.btn}>+</span>
      </div>
      <div className={styles.prices}>
        <div className={styles.amount}>${product.price}</div>
        <div className={styles.remove}>Remove</div>
      </div>
    </div>
  );
};

export default CartItem;
