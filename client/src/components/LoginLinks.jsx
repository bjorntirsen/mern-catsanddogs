import React from "react";
import styles from "../styles/Navbar.module.css";
import Cart from "../bxs-cart.svg";
import { NavLink } from "react-router-dom";

const LoginLinks = () => {
  return (
    <div className={styles.right}>
      <ul className={styles.nav}>
        <li className={styles.li}>
          <NavLink to={`/login`} className={styles.a}>
            Login
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to={`/signup`} className={styles.a}>
            Sign Up
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to="/cart">
            <img className={styles.cart} src={Cart} alt="cart-icon" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LoginLinks;
