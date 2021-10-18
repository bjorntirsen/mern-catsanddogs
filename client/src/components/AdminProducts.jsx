import { React} from "react";
import styles from "../styles/AdminProducts.module.css";
import Button from "./Button";



export default function AdminProducts() {
  return (
    <body className={styles.body}>
      <div className={styles.ap_container}>
        <h2 className={styles.header}>Admin Page</h2>
        <h3 className={styles.header}>Products List</h3>
        <table className={styles.ap_table}>
          <tr>
            <th>Product</th>
            <th className={styles.th_small}>Stock</th>
            <th className={styles.th_small}>Edit</th>
            <th className={styles.th_small}>Delete</th>
          </tr>
          <tr>
            <td>Interactive Toys Balls</td>
            <td>3</td>
            <td><Button type="primary" text="Edit" /></td>
            <td><Button type="secondary" text="Delete" /></td>
          </tr>
        </table>
      </div>
    </body>
  )
};
