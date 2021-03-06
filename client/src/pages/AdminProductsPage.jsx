import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/AdminProducts.module.css";
import Button from "../components/Button";
import UserContext from "../contexts/UserContext";
import { appDeleteCall, appFetchCall } from "../utils/apiCalls";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);

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

  const handleDelete = (slug) => async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${slug}`);
    if (!confirm) return;
    const url = `${process.env.REACT_APP_BASE_URL}/api/products/${slug}`;
    await appDeleteCall(url);
    setProducts((pp) => pp.filter((p) => p.slug !== slug));
  };

  if (isLoading) {
    return (
      <section className={styles.IsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (!user || !user.adminUser) {
    return (
      <section className={styles.body}>
        <p>You do not have permission to access this page</p>
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
  if (products) {
    return (
      <section className={styles.body}>
        <div className={styles.ap_container}>
          <h2 className={styles.header}>Admin Page</h2>
          <h3 className={styles.header}>Products List</h3>
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
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className={styles.th_big}>{product.title}</td>
                  <td>{product.stock}</td>
                  <td>
                    <a href={`/admin/products/${product.slug}`}>
                      <Button btnStyle="primary" text="Update" />
                    </a>
                  </td>
                  <td>
                    <button
                      className={styles.btn_delete}
                      onClick={handleDelete(product.slug)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.ErrorMessage}>
      <p>Something went wrong!</p>
    </section>
  );
}
