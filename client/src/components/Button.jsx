import React from "react";
import styles from "../styles/Button.module.css"; // Import css modules stylesheet as styles

export default function Button({ disabled = false, onClick, type, text }) {
  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnPrimary}`}
      >
        {text}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnSecondary}`}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button onClick={onClick} disabled={disabled} className={styles.btn}>
        {text}
      </button>
    );
  }
}
