import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Cart from "../bxs-cart.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const UserLinks = ({ logoutHandler }) => {
  const [cartSum, setCartSum] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let sum = user.cart
        .map((item) => item.amount)
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        }, 0);
      setCartSum(sum);
    }
  });

  return (
    <div className={styles.right}>
      <ul className={styles.nav}>
        <li className={styles.li}>
          <NavLink to={`/getme`} className={styles.a}>
            Logged in as: {user.fullName}
          </NavLink>
        </li>
        <li className={styles.li}>
          <span className={styles.a} onClick={logoutHandler}>
            Logout
          </span>
        </li>
        <li className={`${styles.li} ${styles.cartLi}`}>
          <NavLink to="/cart">
            <img className={styles.cart} src={Cart} alt="cart-icon" />
          </NavLink>
          <span>{cartSum}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserLinks;
