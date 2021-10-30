import React from "react";
import styles from "../styles/Button.module.css"; // Import css modules stylesheet as styles

export default function Button({ disabled = false, onClick, type, text }) {
  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnPrimary}`}
        type="button"
      >
        {text}
      </button>
    );
  }
  if (type === "secondary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnSecondary}`}
        type="button"
      >
        {text}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.btn}
      type="button"
    >
      {text}
    </button>
  );
}
