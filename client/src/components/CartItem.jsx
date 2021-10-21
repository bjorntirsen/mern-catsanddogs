import React, { useState } from "react";

import styles from "../styles/CartItem.module.css";

const CartItem = ({ product, amount, changeQuantityHandler }) => {
  const [quantity, setQuantity] = useState(amount);

  const handleIncrease = () => {
    changeQuantityHandler(product._id, (amount) => amount + 1);
    setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    changeQuantityHandler(product._id, (_amount) => parseInt(e.target.value));
    setQuantity(parseInt(e.target.value));
  };

  const handleReduce = () => {
    changeQuantityHandler(product._id, (amount) => amount - 1);
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
          onChange={handleChange}
        />
        <span className={styles.btn} onClick={handleIncrease}>
          +
        </span>
      </div>
      <div className={styles.prices}>
        <div className={styles.amount}>${product.price} each</div>
        <div className={styles.remove}>Remove</div>
      </div>
    </div>
  );
};

export default CartItem;
