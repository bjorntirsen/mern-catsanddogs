import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/AdminProducts.module.css";

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

  console.log(orders);
  console.log(user);

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

  const UserOrders = orders.filter(
    (order) => order.customerId === "616bc33369389041610dbef5"
  );

  console.log(UserOrders);

  if (UserOrders) {
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
              {UserOrders.map((order) => {
                return (
                  <div>
                    <tr>
                      <td>{order._id}</td>
                    </tr>
                  </div>
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
