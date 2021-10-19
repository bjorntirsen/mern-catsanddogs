import React, { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import { UserContext } from "../contexts/UserContext";
import StandardLinks from "./StandardLinks";
import LoginLinks from "./LoginLinks";
import UserLinks from "./UserLinks";
import AdminLinks from "./AdminLinks";

const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  if (!user) {
    return (
      <div>
        <nav className={styles.nav}>
          <StandardLinks />
          <LoginLinks />
        </nav>
      </div>
    );
  }
  if (user && !user.adminUser) {
    return (
      <div>
        <nav className={styles.nav}>
          <StandardLinks />
          <UserLinks />
        </nav>
      </div>
    );
  }
  return (
    <div>
      <nav className={styles.nav}>
        <StandardLinks />
        <AdminLinks />
      </nav>
    </div>
  );
};

export default Navbar;
