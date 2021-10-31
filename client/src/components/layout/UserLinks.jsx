import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";
import Cart from "../../bxs-cart.svg";
import UserContext from "../../contexts/UserContext";

const UserLinks = ({ logoutHandler }) => {
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
              Logged in as: {user.fullName}
            </NavLink>
          </li>
        </div>
        <div className={styles.lower}>
          <li className={styles.li}>
            <span
              className={styles.a}
              onClick={logoutHandler}
              role="button"
              onKeyPress={logoutHandler}
              tabIndex={0}
            >
              Logout
            </span>
          </li>
          <li className={styles.li}>
            <NavLink to="/orders" className={styles.a}>
              My orders
            </NavLink>
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

export default UserLinks;
