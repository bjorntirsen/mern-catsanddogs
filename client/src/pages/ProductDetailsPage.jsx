import React, { useState, useEffect } from "react";

import ProductDetails from "../components/ProductDetails.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

import styles from "../styles/ProductDetailsPage.module.css";
import { appFetchCall } from "../utils/apiCalls.js";

const ProductDetailsPage = ({ match }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const slug = match.url.split("/")[2];

  // Store products from db in state
  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/products`;
    appFetchCall(url)
      .then((responseData) => {
        setProducts(responseData.data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  }, [match]);

  useEffect(() => {
    if (products) {
      const [item] = products.filter((item) => item.slug === slug);
      if (!item)
        return setErrorMessage(
          "No item with that slug was found in the database"
        );
      setProduct(item);
      const relatedItems = products.filter((prod) => {
        return prod.category === item.category && prod.slug !== item.slug;
      });
      setRelatedProducts(relatedItems);
    }
  }, [products, slug]);

  if (isLoading) {
    return (
      <section className={styles.IsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.ErrorMessage}>
        <p>{errorMessage}</p>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <ProductDetails product={product} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
