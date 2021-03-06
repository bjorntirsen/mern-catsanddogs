import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";
import Cart from "../../bxs-cart.svg";
import UserContext from "../../contexts/UserContext";

const AdminLinks = ({ logoutHandler }) => {
  const [cartSum, setCartSum] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const sum = user.cart
        .map((item) => item.amount)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        );
      setCartSum(sum);
    }
  }, [user]);

  return (
    <div className={styles.right}>
      <ul className={styles.nav}>
        <div className={styles.upper}>
          <li className={styles.li}>
            <NavLink to="/profile" className={styles.upper_link}>
              Logged in admin: {user.fullName}
            </NavLink>
          </li>
        </div>
        <div className={styles.lower}>
          <li className={styles.li}>
            <NavLink to="/admin/orders" className={styles.a}>
              Orders
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to="/admin/products" className={styles.a}>
              Products
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to="/admin/products/create" className={styles.a}>
              Create Product
            </NavLink>
          </li>
          <li className={styles.li}>
            <span
              className={styles.a}
              onClick={logoutHandler}
              onKeyPress={logoutHandler}
              role="button"
              tabIndex={0}
            >
              Logout
            </span>
          </li>
          <li className={`${styles.li} ${styles.cartLi}`}>
            <NavLink to="/cart">
              <img className={styles.cart} src={Cart} alt="cart-icon" />
            </NavLink>
            <span>{cartSum}</span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default AdminLinks;
