import React from "react";
import styles from "../styles/Navbar.module.css";
import Cart from "../bxs-cart.svg";
import { NavLink } from "react-router-dom";

const AdminLinks = () => {
  return (
    <div className={`${styles.right}`}>
      <ul className={`${styles.nav}`}>
        <li className={`${styles.li}`}>
          <NavLink to={`/admin`}>
            <span className={`${styles.a}`}>Admin</span>
          </NavLink>
        </li>
        <li className={`${styles.li}`}>
          <NavLink to={`/logout`}>
            <span className={`${styles.a}`}>Logout</span>
          </NavLink>
        </li>
        <li className={`${styles.li}`}>
          <NavLink to={`/getme`}>
            <span className={`${styles.a}`}>Get Me</span>
          </NavLink>
        </li>
        <li className={`${styles.li}`}>
          <NavLink to="/cart">
            <img className={`${styles.cart}`} src={Cart} alt="cart-icon" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminLinks;
