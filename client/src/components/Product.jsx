import { React, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import { appPostRequest } from "../utils/apiCalls";

const Product = ({ product }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [btnText, setBtnText] = useState("Add to cart");

  const addToCart = () => {
    if (product.stock === 0) return null;

    if (!user) {
      history.push("/login");
    }
    const fetchAndAddOneToCart = async () => {
      if (localStorage.getItem("tkn")) {
        const url = `${process.env.REACT_APP_BASE_URL}/api/carts/addOne`;
        const body = {
          id: product._id,
          amount: 1,
        };

        const responseData = await appPostRequest(url, body);
        setUser(responseData.data.user);
      }
    };

    fetchAndAddOneToCart().catch((error) => {
      console.log(error);
    });
    setBtnText("Added!");
  };

  const checkStock = (item) => {
    if (item.stock === 0) {
      setBtnText("Sold Out");
    } else {
      setTimeout(() => {
        setBtnText("Add to cart");
      }, 1500);
    }
  };

  useEffect(() => {
    checkStock(product);
  }, [product]);

  return (
    <div>
      <Link to={`/products/${product.slug}`}>
        <img src={product.imageUrl} alt="" />
      </Link>
      <p>{product.title}</p>
      <span>
        <h4>${product.price}</h4>
      </span>
      <div onClick={addToCart}>
        <Button type="primary" text={btnText} />
      </div>
    </div>
  );
};

export default Product;
