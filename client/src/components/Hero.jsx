import { useState } from "react";
import styles from "../styles/Hero.module.css";
import Button from "./Button";

export default function Hero() {
  return (
    <div className={styles.hero_container}>
      <div className={styles.cats}>
        <Button type="secondary" text="Shop Cats" />
      </div>
      <div className={styles.dogs}>dogs</div>
    </div>
  );
}
