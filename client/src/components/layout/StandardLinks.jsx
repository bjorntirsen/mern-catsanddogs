import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";
import logo from "../../assets/logo.png";

const StandardLinks = () => (
  <>
    <div className={styles.left}>
      <li className={styles.li}>
        <NavLink to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink to="/">
          <span className={styles.title}>Cats&Dogs</span>
        </NavLink>
      </li>
    </div>

    <div className={styles.center}>
      <ul className={styles.nav}>
        <li className={styles.li}>
          <NavLink to="/">
            <span className={styles.a}>Home</span>
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to="/products">
            <span className={styles.a}>Shop</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </>
);

export default StandardLinks;
