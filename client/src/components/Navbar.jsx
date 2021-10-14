import React from "react";
import logo from '../logo.png';
import Cart from '../bxs-cart.svg';
import { NavLink } from "react-router-dom";
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div >
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
                        <a className={`${styles.a}`}>Home</a>
                    </NavLink>
                </li>
                <li className={`${styles.li}`}>
                    <NavLink to="/shop">
                    <a className={`${styles.a}`}>Shop</a>
                    </NavLink>
                </li>
                <li className={`${styles.li}`}>
                    <NavLink to="/contact">
                    <a className={`${styles.a}`}>Contact</a>
                    </NavLink>
                </li>
                <li className={`${styles.li} ${styles.a}`}>
                    <NavLink to="/about">
                    <a className={`${styles.a}`}>About us</a>
                    </NavLink>
                </li>
            </ul>
          </div>

          <div className={`${styles.right}`}>
            <ul className={`${styles.nav}`}>
                <li className={`${styles.li}`}>
                    <NavLink to="/login">
                        <a className={`${styles.a}`}>Login</a>
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