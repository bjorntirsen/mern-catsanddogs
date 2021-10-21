import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/AdminProducts.module.css";
import Button from "./Button";

const UserOrders = () => {
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

  if (!user) {
    return (
      <section>
        <p>Please login to access this page</p>
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

  const UserOrders = orders.filter((order) => order.customerId === user._id);

  if (UserOrders) {
    return (
      <div className={styles.body}>
        <div className={styles.ap_container}>
          <h2 className={styles.header}>Profile Page</h2>
          <h3 className={styles.header}>My Orders</h3>
          <table className={styles.ap_table}>
            <thead>
              <tr>
                <th className={styles.th_big}>Order Date</th>
                <th className={styles.th_small}>Status</th>
                <th className={styles.th_big}>Delivery Address</th>
                <th className={styles.th_small}>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {UserOrders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order.datePlaced}</td>
                    <td>{order.status}</td>
                    <td>{order.deliveryAddress}</td>
                    <td>
                      <Button type="secondary" text="Cancel" />
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
};

export default UserOrders;
