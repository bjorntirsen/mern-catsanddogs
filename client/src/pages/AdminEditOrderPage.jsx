import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/AdminEditProduct.module.css";
import { UserContext } from "../contexts/UserContext";

const AdminEditOrderPage = ({ match }) => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const orderId = match.url.split("/")[3];

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
  }, [match]);

  useEffect(() => {
    if (orders) {
      const [item] = orders.filter((item) => item._id === orderId);
      if (!item)
        return setErrorMessage(
          "No item with that slug was found in the database"
        );
      setOrder(item);
    }
  }, [orders, orderId]);

  function renderInputs(keyList) {
    return Object.entries(order)
      .filter(([k, v]) => keyList.includes(k))
      .map(([k, v]) => (
        <tr key={k}>
          <th className={styles.th}>{k}</th>
          <td>
            <input
              className={styles.input}
              type="text"
              name={k}
              value={v || ""}
              size={50}
              onChange={getHandleChange(k)}
            />
          </td>
        </tr>
      ));
  }

  const getHandleChange = (k) => (event) => {
    setOrder({ ...order, [k]: event.target.value });
  };

  const handleOnSubmit = (orderId) => async (event) => {
    event.preventDefault();
    const url = `/api/orders/${orderId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order)
    });
    if (!response.ok) {
      const responseErrorMessage = await response.json();
      setMessage(responseErrorMessage);
    }
    if (response.ok) {
      setMessage("Successfully updated order's status!");
    }
  }

  if (!user || !user.adminUser) {
    return (
      <div>
        <p>You do not have permission to access this page</p>
      </div>
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
    <div className={styles.body}>
      <div className={styles.ap_container}>
        <h2 className={styles.header}>Admin Page</h2>
        <h3 className={styles.header}>Edit order</h3>
        <form onSubmit={handleOnSubmit}>
          <table className={styles.ap_table}>
            <tbody>
              <tr>
                <th>Order ID</th>
                <td className={styles.th_id}>{order._id}</td>
              </tr>
              {renderInputs([
                "status",
              ])}
            </tbody>
          </table>
          <button type="submit">Update status</button>
        </form>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default AdminEditOrderPage;
