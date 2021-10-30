import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import StandardLinks from "./StandardLinks";
import LoginLinks from "./LoginLinks";
import UserLinks from "./UserLinks";
import AdminLinks from "./AdminLinks";

import styles from "../../styles/Navbar.module.css";
import Hero from "../Hero";

const Navbar = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setUser(null);
    history.push("/");
  };

  if (!user) {
    return (
      <>
        <header className={styles.container}>
          <nav className={styles.nav}>
            <StandardLinks />
            <LoginLinks />
          </nav>
        </header>
        {path === "/" && <Hero />}
      </>
    );
  }
  if (user && !user.adminUser) {
    return (
      <>
        <header className={styles.container}>
          <nav className={styles.nav}>
            <StandardLinks />
            <UserLinks logoutHandler={handleLogout} />
          </nav>
        </header>
        {path === "/" && <Hero />}
      </>
    );
  }
  return (
    <>
      <header className={styles.container}>
        <nav className={styles.nav}>
          <StandardLinks />
          <AdminLinks logoutHandler={handleLogout} />
        </nav>
      </header>
      {path === "/" && <Hero />}
    </>
  );
};

export default Navbar;
