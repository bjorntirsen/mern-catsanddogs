import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

import styles from "../styles/ProductDetails.module.css";
import Product from "./Product";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className={styles.rp_container}>
      <h2>Related Products</h2>
      <div className={styles.related_products}>
        {relatedProducts &&
          relatedProducts
            .filter((_, index) => index < 4)
            .map((product, index) => {
              return <Product key={product._id} product={product} />;
            })}
      </div>
    </div>
  );
};

export default RelatedProducts;
