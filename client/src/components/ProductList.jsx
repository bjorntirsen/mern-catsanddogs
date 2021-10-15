import { React, useState, useEffect } from "react";

import Product from "./Product";

import classes from "./ProductList.module.css";

const ProductList = (props) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "/api/products";
      if (props.category) {
        const { category } = props;
        console.log(category);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setProducts(responseData.data.products);
      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [props]);

  if (isLoading) {
    return (
      <section className={classes.IsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={classes.ErrorMessage}>
        <p>{errorMessage}</p>
      </section>
    );
  }

  if (products) {
    return (
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    );
  }

  return (
    <section className={classes.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );
};

export default ProductList;
