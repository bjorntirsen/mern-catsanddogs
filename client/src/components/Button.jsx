import React from "react";
import styles from "../styles/Button.module.css"; // Import css modules stylesheet as styles

export default function Button({
  disabled = false,
  onClick,
  btnStyle,
  btnType,
  text,
}) {
  if (btnStyle === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnPrimary}`}
        type={btnType === "submit" ? "submit" : "button"}
      >
        {text}
      </button>
    );
  }
  if (btnStyle === "secondary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.btn} ${styles.btnSecondary}`}
        type={btnType === "submit" ? "submit" : "button"}
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
      type={btnType === "submit" ? "submit" : "button"}
    >
      {text}
    </button>
  );
}
