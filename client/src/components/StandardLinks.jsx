import React from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const StandardLinks = () => {
  return (
    <>
      <div className={`${styles.left}`}>
        <li className={`${styles.li}`}>
          <NavLink to="/">
            <img className={`${styles.logo}`} src={logo} alt="logo" />
          </NavLink>
        </li>
      </div>

      <div className={`${styles.center}`}>
        <ul className={`${styles.nav}`}>
          <li className={`${styles.li}`}>
            <NavLink to="/">
              <span className={`${styles.a}`}>Home</span>
            </NavLink>
          </li>
          <li className={`${styles.li}`}>
            <NavLink to="/products">
              <span className={`${styles.a}`}>Shop</span>
            </NavLink>
          </li>
          <li className={`${styles.li}`}>
            <NavLink to="/contact">
              <span className={`${styles.a}`}>Contact</span>
            </NavLink>
          </li>
          <li className={`${styles.li} ${styles.a}`}>
            <NavLink to="/about">
              <span className={`${styles.a}`}>About us</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StandardLinks;
