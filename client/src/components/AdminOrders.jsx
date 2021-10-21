import { React, useEffect, useState, useContext } from "react";
import styles from "../styles/AdminProducts.module.css";
import Button from "./Button";
import { UserContext } from "../contexts/UserContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);

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

      setOrders(responseData.data.orders);
      setIsLoading(false);
    };
    fetchOrders().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, []);

  if (!user || !user.adminUser) {
    return (
      <section>
        <p>You do not have permisson to access this page</p>
      </section>
    );
  }

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
                <th className={styles.th_big}>Order Id</th>
                <th className={styles.th_small}>Status</th>
                <th className={styles.th_small}>Address</th>
                <th className={styles.th_small}>Edit</th>
                <th className={styles.th_small}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className={styles.th_big}>{order._id}</td>
                    <td>{order.status}</td>
                    <td>{order.deliveryAddress}</td>
                    <td>
                      <Button type="primary" text="Update" />
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
    <section className={styles.ErrorMessage}>
      <p>"Something went wrong!"</p>
    </section>
  );
};

export default AdminOrders;
