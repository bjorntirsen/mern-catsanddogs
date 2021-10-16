import React from "react";
import logo from "../assets/logo.png";
import Cart from "../bxs-cart.svg";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={`${styles.nav}`}>
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
              <NavLink to="/shop">
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

        <div className={`${styles.right}`}>
          <ul className={`${styles.nav}`}>
            <li className={`${styles.li}`}>
              <NavLink to="/login">
                <span className={`${styles.a}`}>Login</span>
              </NavLink>
            </li>
            <li className={`${styles.li}`}>
              <NavLink to="/cart">
                <img className={`${styles.cart}`} src={Cart} alt="cart-icon" />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
