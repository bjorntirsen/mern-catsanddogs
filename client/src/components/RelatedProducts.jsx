import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

import styles from "../styles/ProductDetails.module.css";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className={styles.rp_container}>
      <h2>Related Products</h2>
      <div className={styles.related_products}>
        {relatedProducts &&
          relatedProducts
            .filter((_, index) => index < 4)
            .map((item, index) => {
              return (
                <div key={index}>
                  <Link to={`/products/${item.slug}`}>
                    <img src={item.imageUrl} alt="" />
                  </Link>
                  <p>{item.title}</p>
                  <span>
                    <h4>${item.price}</h4>
                  </span>
                  <Button type="primary" text="Add to Cart" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RelatedProducts;
