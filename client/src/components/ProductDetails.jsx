import { React, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Button from "./Button";
import styles from "../styles/ProductDetails.module.css";
import { appPostRequest } from "../utils/apiCalls";

const ProductDetails = ({ product }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [btnText, setBtnText] = useState("Add to Cart");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const reduceQuantityHandler = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const increaseQuantityHandler = () => {
    if (quantity === product.stock) return;
    setQuantity(quantity + 1);
  };

  const onChangeHandler = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const addToCart = () => {
    if (!user) {
      history.push("/login");
    }

    const fetchAndAddOneOrManyToCart = async () => {
      if (localStorage.getItem("tkn")) {
        const url = `${process.env.REACT_APP_BASE_URL}/api/carts/addMany`;
        const body = {
          id: product._id,
          amount: quantity,
        };
        const responseData = await appPostRequest(url, body);
        setUser(responseData.data.user);
      }
    };
    fetchAndAddOneOrManyToCart().catch((error) => {
      console.error(error);
    });
  };

  const productAvailable = (item) => {
    if (item.stock === 0) return false;
    return true;
  };

  useEffect(() => {
    setQuantity(1);
    if (user) {
      if (!productAvailable(product)) {
        setQuantity(0);
        setBtnText("Sold Out");
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
        setBtnText("Add to Cart");
      }
    }
  }, [product, user]);

  return (
    <div className={styles.details_top}>
      <div className={styles.details_top_images}>
        <div className={styles.main_image_container}>
          <img
            src={product.imageUrl}
            className={styles.main_image}
            alt="product"
          />
        </div>
      </div>
      <div className={styles.details_top_content}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Number in stock: {product.stock}</strong>
        </p>
        <div className={styles.price_wrapper}>
          <p>{`$${product.price}`}</p>
        </div>
        <div className={styles.cta_area}>
          <label htmlFor="qty_input">Quantity:</label>
          <span className={styles.quantity}>
            <span
              onClick={reduceQuantityHandler}
              role="button"
              onKeyPress={reduceQuantityHandler}
              tabIndex={0}
            >
              -
            </span>
            <input
              onChange={onChangeHandler}
              type="number"
              name="qty_input"
              value={quantity}
              min="1"
              max={product.stock}
            />
            <span
              onClick={increaseQuantityHandler}
              role="button"
              onKeyPress={increaseQuantityHandler}
              tabIndex={0}
            >
              +
            </span>
          </span>
          <Button
            onClick={addToCart}
            btnStyle="primary"
            text={btnText}
            disabled={btnDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
