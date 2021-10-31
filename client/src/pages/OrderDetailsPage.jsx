import React, { useState, useEffect } from "react";

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
        setErrorMessage(error.message);
        setIsLoading(false);
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
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.IsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (order) {
    return (
      <section className={styles.container}>
        <div className={styles.card}>
          <h2>Order details and receipt</h2>
          <div className={styles.card_line}>
            <p>Order id: {order._id}</p>
          </div>
          <div className={styles.info_container}>
            <p className={styles.info_item}>
              <strong>Date placed: </strong>
              {new Date(order.datePlaced).toLocaleString("en-US")}
            </p>
            <p className={styles.info_item}>
              <strong>Customer ID: </strong>
              {order.customerId}
            </p>
            <p className={styles.info_item}>
              <strong>Delivery Address: </strong>
              {order.deliveryAddress}
            </p>
            <p className={styles.info_item}>
              <strong>Shipping cost: </strong>${order.shippingCost}
            </p>
            <p>
              <strong>Order status: </strong>
              {order.status}
            </p>
          </div>
          <h3 className={styles.content}>Content:</h3>
          <div className={styles.content_container}>
            {products &&
              order.content.map((content) => {
                const OrderProducts = products.filter(
                  (product) => product._id === content.productId
                );
                return (
                  <div className={styles.content_item} key={content.productId}>
                    <p className={styles.card_small_line}>
                      <span>Product Title:</span>
                      {OrderProducts[0]
                        ? OrderProducts[0].title
                        : content.productId}
                    </p>
                    <p key={content.amount} className={styles.card_small_line}>
                      <span>Amount:</span> {content.amount}
                    </p>
                    <p className={styles.card_small_line}>
                      <span>Price each at purchase:</span>$
                      {content.unitPriceAtPurchase}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
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

  return <section>Something went wrong...</section>;
};

export default OrderDetailsPage;
