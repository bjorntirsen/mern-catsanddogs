import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Footer.module.css";
import logo from "../../assets/logo-white.png";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={`${styles.footerContent} ${styles.footerMain}`}>
        <div className={styles.footerCol}>
          <img src={logo} alt="Logo" />
          <p>1203 Town Center Orive #L 335458 USA</p>
          <p>+841 123 456 78</p>
          <p>info@company.com</p>
        </div>
        <div className={styles.footerCol}>
          <h3>Store Menu</h3>
          <Link className={styles.footerLink} to="/products">
            All Products
          </Link>
          <Link className={styles.footerLink} to="/products/categories/cat">
            Cat Products
          </Link>
          <Link className={styles.footerLink} to="/products/categories/dog">
            Dog Products
          </Link>
        </div>
      </div>
      <div className={`${styles.footerContent} ${styles.footerCol}`}>
        <hr />
        <p>© Cats & Dogs 2021</p>
      </div>
    </footer>
  );
}
