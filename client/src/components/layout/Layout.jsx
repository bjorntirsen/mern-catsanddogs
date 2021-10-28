import { Fragment } from "react";

import classes from "../../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
