import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

const Product = ({product}) => {
  return (
    <div>
      <Link to={`/products/${product.slug}`}>
        <img src={product.imageUrl} alt="" />
      </Link>
      <p>{product.title}</p>
      <span>
        <h4>${product.price}</h4>
      </span>
      <Button type="primary" text="Add to Cart" />
    </div>
  );
};

export default Product;
