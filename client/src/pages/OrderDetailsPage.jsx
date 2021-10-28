import React, { useState, useEffect, Fragment } from "react";

import styles from "../styles/OrderDetailsPage.module.css";
import { appFetchCall } from "../utils/apiCalls";

const OrderDetailsPage = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/orders/${match.params.id}`;
    appFetchCall(url)
      .then((responseData) => {
        setOrder(responseData.data.order);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  }, [match]);

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
