import React, { Fragment } from "react";

import classes from "../../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className={classes.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;
