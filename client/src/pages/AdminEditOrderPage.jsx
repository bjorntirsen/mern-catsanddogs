import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/AdminEditProduct.module.css";
import UserContext from "../contexts/UserContext";
import { appUpdateCall } from "../utils/apiCalls";

const AdminEditOrderPage = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [wasChanged, setWasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const orderId = match.url.split("/")[3];

  useEffect(() => {
    const fetchOrders = async () => {
      const url = `${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}`;
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
      setOrderStatus(responseData.data.order.status);
      setOrder(responseData.data.order);
      setIsLoading(false);
    };
    fetchOrders().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [orderId]);

  const handleOnChange = (event) => {
    event.preventDefault();
    setOrderStatus(event.target.value);
    setWasChanged(true);
    setMessage("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (orderStatus.trim() === "")
      return setMessage("Please enter a status for the order.");
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/orders/status/${orderId}`;
      const responseData = await appUpdateCall(url, { status: orderStatus });
      setOrderStatus(responseData.data.order.status);
      setMessage("Successfully updated order's status!");
      return setWasChanged(false);
    } catch (err) {
      return console.error(err);
    }
  };

  if (!user || !user.adminUser) {
    return (
      <section>
        <p>You do not have permission to access this page</p>
      </section>
    );
  }

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

  return (
    <section className={styles.body}>
      <div className={styles.ap_container}>
        <h2 className={styles.header}>Admin Page</h2>
        <h3 className={styles.header}>Edit order</h3>
        <table className={styles.ap_table}>
          <tbody>
            <tr>
              <th>Order ID</th>
              <td className={styles.th_id}>{order._id}</td>
            </tr>
            <tr>
              <th className={styles.th}>Status:</th>
              <td>
                <input
                  className={styles.input}
                  type="text"
                  name="status"
                  value={orderStatus}
                  size={50}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {wasChanged && (
          <button type="submit" onClick={handleOnSubmit}>
            Update status
          </button>
        )}
        <p className={styles.message}>{message}</p>
      </div>
    </section>
  );
};

export default AdminEditOrderPage;
