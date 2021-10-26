import React, { useState, useEffect, Fragment } from "react";

import styles from "../styles/OrderDetailsPage.module.css";

const OrderDetailsPage = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("tkn");
      const url = `/api/orders/${match.params.id}`;
      const obj = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, obj);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      setOrder(responseData.data.order);
      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [match]);

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
      <section className={styles.container}>
        <div className={styles.ErrorMessage}>
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }

  if (order) {
    return (
      <section className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.header}>Order details and receipt</h2>
          <p className={styles.card_line}>
            <span>Order id:</span> {order._id}
          </p>
          <p className={styles.card_line}>
            <span>Date placed:</span>{" "}
            {new Date(order.datePlaced).toLocaleString("en-US")}
          </p>
          <p className={styles.card_line}>
            <span>Order status:</span> {order.status}
          </p>
          <h3 className={styles.header}>Content:</h3>
          {order.content.map((content) => {
            const OrderProducts = products.filter(
              (product) => product._id === content.productId
            );
            return (
              <Fragment key={content.productId}>
                <p className={styles.card_small_line}>
                  <span>Product Title:</span>
                  {OrderProducts[0]
                    ? OrderProducts[0].title
                    : content.productId}
                </p>
                <p key={content.amount} className={styles.card_small_line}>
                  <span>Amount:</span> {content.amount}
                </p>
                <p className={styles.card_line}>
                  <span>Price each at purchase:</span>$
                  {content.unitPriceAtPurchase}
                </p>
              </Fragment>
            );
          })}
        </div>
      </section>
    );
  }

  return <div>OrderDetailsPage</div>;
};

export default OrderDetailsPage;
