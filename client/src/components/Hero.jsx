import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Hero.module.css";
import Button from "./Button";

export default function Hero() {
  return (
    <section className={styles.hero_container}>
      <Link to="/products/categories/cats">
        <div className={styles.cats}>
          <Button btnStyle="primary" text="Shop Cat Toys" />
        </div>
      </Link>
      <Link to="/products/categories/dogs">
        <div className={styles.dogs}>
          <Button btnStyle="primary" text="Shop Dog Toys" />
        </div>
      </Link>
    </section>
  );
}
