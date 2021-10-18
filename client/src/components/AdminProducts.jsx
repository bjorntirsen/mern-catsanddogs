import { React, useState, useEffect } from "react";
import styles from "../styles/AdminProducts.module.css";
import Button from "./Button";

const AdminProducts = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "/api/products";
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
  }, []);

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
      <body className={styles.body}>
        <div className={styles.ap_container}>
          <h2 className={styles.header}>Admin Page</h2>
          <h3 className={styles.header}>Products List</h3>
          <table className={styles.ap_table}>
            <tr>
              <th>Product</th>
              <th className={styles.th_small}>Stock</th>
              <th className={styles.th_small}>Edit</th>
              <th className={styles.th_small}>Delete</th>
            </tr>
            {products.map((product) => {
              return (
                <tr>
                <td>{product.title}</td>
                <td>{product.stock}</td>
                <td><Button type="primary" text="Edit" /></td>
                <td><Button type="secondary" text="Delete" /></td>
              </tr>
              )
            })}
          </table>
        </div>
      </body>
    )
  };

  return (
    <section className={styles.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );

};

export default AdminProducts;