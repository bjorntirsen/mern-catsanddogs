import { React, useEffect, useState } from "react";
import styles from "../styles/AdminProducts.module.css";
import Button from "./Button";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const url = "/api/orders";
      const token = localStorage.getItem("tkn");
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

      console.log(responseData);

      setOrders(responseData.data.orders);
      setIsLoading(false);
    };
    fetchOrders().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, []);

  console.log(orders);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <p>{errorMessage}</p>
      </section>
    );
  }

  if (orders) {
    return (
      <div className={styles.body}>
        <div className={styles.ap_container}>
          <h2 className={styles.header}>Admin Page</h2>
          <h3 className={styles.header}>Orders List</h3>
          <table className={styles.ap_table}>
            <thead>
              <tr>
                <th className={styles.th_big}>Product</th>
                <th className={styles.th_small}>Stock</th>
                <th className={styles.th_small}>Edit</th>
                <th className={styles.th_small}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.slug}>
                    <td className={styles.th_big}>{order.customerId}</td>
                    <td>{order.datePlaced}</td>
                    <td>
                      <a href={`/admin/products/${order.slug}`}>
                        <Button type="primary" text="Update" />
                      </a>
                    </td>
                    <td>
                      <Button type="secondary" text="Delete" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Orders Page</h1>
    </div>
  );
};

export default AdminOrders;
