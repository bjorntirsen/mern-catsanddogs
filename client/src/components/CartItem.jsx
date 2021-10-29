import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import styles from "../styles/CartItem.module.css";
import { appPostRequest } from "../utils/apiCalls";

const CartItem = ({
  setCart,
  setTotalPrice,
  product,
  amount,
  changeQuantityHandler,
}) => {
  const [quantity, setQuantity] = useState(amount);
  const { user, setUser } = useContext(UserContext);

  const handleChange = (event) => {
    // eslint-disable-next-line no-unused-vars
    changeQuantityHandler(product._id, (_amount) =>
      parseInt(event.target.value, 10)
    );
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleIncrease = () => {
    if (quantity >= product.stock) return;
    changeQuantityHandler(product._id, (_amount) => _amount + 1);
    setQuantity(quantity + 1);
  };

  const handleReduce = () => {
    if (quantity > 1) {
      changeQuantityHandler(product._id, (_amount) => _amount - 1);
      setQuantity(quantity - 1);
    }
  };

  const handleRemoveClick = async (productId) => {
    const updatedCart = user.cart.filter(
      (item) => item.productId !== productId
    );
    const url = `${process.env.REACT_APP_BASE_URL}/api/carts/update`;

    const responseData = await appPostRequest(url, { updatedCart });

    setUser(responseData.data.user);
    setCart(updatedCart);
    if (responseData.data.user.cart.length === 0) setTotalPrice(0);
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
        <span
          className={styles.btn}
          onClick={handleReduce}
          role="button"
          onKeyPress={handleReduce}
          tabIndex={0}
        >
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
        <span
          className={styles.btn}
          onClick={handleIncrease}
          role="button"
          onKeyPress={handleIncrease}
          tabIndex={0}
        >
          +
        </span>
      </div>
      <div className={styles.prices}>
        <div className={styles.amount}>${product.price} each</div>
        <div
          onClick={() => handleRemoveClick(product._id)}
          className={styles.remove}
          role="button"
          onKeyPress={() => handleRemoveClick(product._id)}
          tabIndex={0}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default CartItem;
