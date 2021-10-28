import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import StandardLinks from "../../components/StandardLinks";
import LoginLinks from "../../components/LoginLinks";
import UserLinks from "../../components/UserLinks";
import AdminLinks from "../../components/AdminLinks";

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setUser(null);
    history.push("/");
  };

  if (!user) {
    return (
      <header>
        <nav className={styles.nav}>
          <StandardLinks />
          <LoginLinks />
        </nav>
      </header>
    );
  }
  if (user && !user.adminUser) {
    return (
      <header>
        <nav className={styles.nav}>
          <StandardLinks />
          <UserLinks logoutHandler={handleLogout} />
        </nav>
      </header>
    );
  }
  return (
    <header>
      <nav className={styles.nav}>
        <StandardLinks />
        <AdminLinks logoutHandler={handleLogout} />
      </nav>
    </header>
  );
};

export default Navbar;
