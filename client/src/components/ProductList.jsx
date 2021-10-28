import { React, useState, useEffect } from "react";

import Product from "./Product";
import styles from "../styles/ProductList.module.css";
import SearchBar from "../components/SearchBar";
import { appFetchCall } from "../utils/apiCalls";

const ProductList = (props) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    let isMounted = true;
    let url = `${process.env.REACT_APP_BASE_URL}/api/products`;
    if (props.category) {
      const { category } = props;
      const singularCategory = category.substring(0, 3);
      url += `/categories/${singularCategory}`;
    }

    appFetchCall(url)
      .then((responseData) => {
        if (isMounted) {
          setProducts(responseData.data.products);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setIsLoading(false);
          setErrorMessage(error.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [props]);

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

  if (products) {
    return (
      <section className={styles.container}>
        <SearchBar products={products} />
        {props.category ? (
          <h1>{props.category.substring(0, 3)} products:</h1>
        ) : (
          <h1>products:</h1>
        )}
        <div className={styles.products}>
          {products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );
};

export default ProductList;
