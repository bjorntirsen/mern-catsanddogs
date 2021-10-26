import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/AdminEditProduct.module.css";
import { UserContext } from "../contexts/UserContext";

const AdminEditProductPage = ({ match }) => {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const slug = match.url.split("/")[3];

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `${process.env.REACT_APP_BASE_URL}/api/products`;
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
      setProducts(responseData.data.products);
      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [match]);

  useEffect(() => {
    if (products) {
      const [item] = products.filter((item) => item.slug === slug);
      if (!item)
        return setErrorMessage(
          "No item with that slug was found in the database"
        );
      setProduct(item);
    }
  }, [products, slug]);

  function renderInputs(keyList) {
    return Object.entries(product)
      .filter(([k, v]) => keyList.includes(k))
      .map(([k, v]) => (
        <tr key={k}>
          <th className={styles.th}>{k}</th>
          <td>
            <input
              className={styles.input}
              type="text"
              name={k}
              value={v}
              size={50}
              onChange={getHandleChange(k)}
            />
          </td>
        </tr>
      ));
  }

  const getHandleChange = (k) => (event) => {
    setProduct({ ...product, [k]: event.target.value });
  };

  const handleOnSubmit = (slug) => async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/api/products/${slug}`;
    const token = localStorage.getItem("tkn");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const responseErrorMessage = await response.json();
      setMessage(responseErrorMessage);
    }
    if (response.ok) {
      setMessage("Successfully updated product!");
    }
  };

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
        <h3 className={styles.header}>Edit product</h3>
        <form onSubmit={handleOnSubmit(product.slug)}>
          <table className={styles.ap_table}>
            <tbody>
              {renderInputs([
                "title",
                "price",
                "categoty",
                "description",
                "imageUrl",
                "weight",
                "maker",
                "stock",
              ])}
            </tbody>
          </table>
          <button type="submit">Update product</button>
        </form>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default AdminEditProductPage;
