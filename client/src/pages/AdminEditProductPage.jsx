import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/AdminEditProduct.module.css";
import UserContext from "../contexts/UserContext";
import { appPostRequest, appFetchCall } from "../utils/apiCalls";

const AdminEditProductPage = ({ match }) => {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const slug = match.url.split("/")[3];

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
  }, [match]);

  useEffect(() => {
    if (products) {
      const [item] = products.filter((_item) => _item.slug === slug);
      if (!item) {
        setErrorMessage("No item with that slug was found in the database");
        return;
      }
      setProduct(item);
    }
  }, [products, slug]);

  const getHandleChange = (key) => (event) => {
    setProduct({ ...product, [key]: event.target.value });
  };

  function renderInputs(keyList) {
    return Object.entries(product)
      .filter(([key]) => keyList.includes(key))
      .map(([key, value]) => (
        <tr key={key}>
          <th className={styles.th}>{key}</th>
          <td className={styles.td}>
            {key === "description" ? (
              <textarea type="text" className={styles.input} rows="18">
                {value}
              </textarea>
            ) : (
              <input
                className={styles.input}
                type="text"
                name={key}
                value={value}
                size={50}
                onChange={getHandleChange(key)}
              />
            )}
          </td>
        </tr>
      ));
  }

  const handleOnSubmit = (productSlug) => async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/api/products/${productSlug}`;

    try {
      await appPostRequest(url, product);
      setMessage("Successfully updated product");
    } catch (e) {
      setMessage(e.message);
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
    <section className={styles.container}>
      <h1 className={styles.title}>Admin Page</h1>
      <h2 className={styles.subtitle}>Edit product</h2>
      {console.log(product)}
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
        <div className={styles.btn_container}>
          <button type="submit" className={styles.btn}>
            Update product
          </button>
          <p className={styles.message}>{message}</p>
        </div>
      </form>
    </section>
  );
};

export default AdminEditProductPage;
