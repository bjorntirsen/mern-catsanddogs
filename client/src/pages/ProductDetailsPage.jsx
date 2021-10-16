import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import devProducts from "../dev-data/products.js";
import Button from "../components/Button";
import RelatedProducts from "../components/RelatedProducts.jsx";

import styles from "../styles/ProductDetails.module.css";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const [item] = devProducts.filter((item) => item.slug === slug);
    setProduct(item);
    const relatedItems = devProducts.filter((prod) => {
      return prod.category === item.category && prod.slug !== item.slug;
    });
    setRelatedProducts(relatedItems);
  }, [slug, product]);

  return (
    <div className={styles.container}>
      {product && (
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
                <span onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                  -
                </span>
                <input
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  type="number"
                  name="qty_input"
                  value={quantity}
                  min="1"
                />
                <span onClick={() => setQuantity(quantity + 1)}>+</span>
              </span>
              <Button type="primary" text="Add to Cart" />
            </div>
          </div>
        </div>
      )}

      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
}
