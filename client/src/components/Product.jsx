import { React, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Button from "../components/Button";

const Product = ({ product }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const addToCart = () => {
    if (!user) {
      history.push("/login");
    }
    const fetchAndAddOneToCart = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = "/api/carts/addOne";
        const body = {
          id: product._id,
          amount: 1,
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
        console.log(responseData);
        setUser(responseData.data.user);
      }
    };
    fetchAndAddOneToCart().catch((error) => {
      console.log(error);
    });
  };
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
        <Button type="primary" text="Add to Cart" />
      </div>
    </div>
  );
};

export default Product;
