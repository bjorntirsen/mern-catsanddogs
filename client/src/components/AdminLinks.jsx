import React, { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import Cart from "../bxs-cart.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const AdminLinks = ({ logoutHandler }) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.right}>
      <ul className={styles.nav}>
        <li className={styles.li}>
          <NavLink to={`/profile`} className={styles.a}>
            Logged in admin: {user.fullName}
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to={`/admin/orders`} className={styles.a}>
            Orders
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to={`/admin/products`} className={styles.a}>
            Products
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to={`/admin/products/create`} className={styles.a}>
            Create Product
          </NavLink>
        </li>
        <li className={styles.li}>
          <span className={styles.a} onClick={logoutHandler}>
            Logout
          </span>
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

export default AdminLinks;
