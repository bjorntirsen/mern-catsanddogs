import React from "react";

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
            .map((product) => {
              return <Product key={product._id} product={product} />;
            })}
      </div>
    </div>
  );
};

export default RelatedProducts;
