import { React, useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/ProductDetails.module.css";

const ProductDetails = ({ product }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [btnText, setBtnText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const productAvailable = useCallback(() => {
    const prodInCart = user.cart.find((item) => item.productId === product._id);
    if (prodInCart) {
      const prodAvailable = product.stock - prodInCart.amount;
      return quantity < prodAvailable;
    }
    return quantity < product.stock;
  }, [product, quantity, user]);

  const reduceQuantityHandler = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const increaseQuantityHandler = () => {
    if (!productAvailable()) return null;
    else setQuantity(quantity + 1);
  };

  const onChangeHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const addToCart = () => {
    if (!user) {
      history.push("/login");
    }
    // Check if product is sold out
    if (product.stock === 0) return null;

    const fetchAndAddOneOrManyToCart = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = "/api/carts/addMany";
        const body = {
          id: product._id,
          amount: quantity,
        };
        const obj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        };

        const response = await fetch(url, obj);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        setUser(responseData.data.user);
      }
    };
    fetchAndAddOneOrManyToCart().catch((error) => {
      console.log(error);
    });
  };

  const checkStockAndSetBtnText = (item) => {
    if (item.stock === 0) setBtnText("Sold Out");
    else setBtnText("Add to Cart");
  };

  useEffect(() => {
    setQuantity(1);
    checkStockAndSetBtnText(product);
    if (user) {
      if (!productAvailable()) {
        setQuantity(0);
        setBtnText("Max limit reached");
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
        setBtnText("Add to Cart");
      }
    }
  }, [product, user, productAvailable]);

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
        <div className={styles.secondary_images_container}>
          <div>Image 1</div>
          <div>Image 2</div>
          <div>Image 3</div>
        </div>
      </div>
      <div className={styles.details_top_content}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className={styles.price_wrapper}>
          <span>{`$${product.price}`}</span>
        </div>
        <div className={styles.cta_area}>
          <label htmlFor="qty_input">Quantity:</label>
          <span className={styles.quantity}>
            <span onClick={reduceQuantityHandler}>-</span>
            <input
              onChange={onChangeHandler}
              type="number"
              name="qty_input"
              value={quantity}
              min="1"
              max={product.stock}
            />
            <span onClick={increaseQuantityHandler}>+</span>
          </span>
          <Button
            onClick={addToCart}
            type="primary"
            text={btnText}
            disabled={btnDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
