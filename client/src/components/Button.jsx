import React from "react";
import styles from '../styles/Button.module.css'; // Import css modules stylesheet as styles

export default function Button({type, text}) {
    if(type === 'primary') {
        return (
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
                {text}
            </button>
        );
    }
    else if(type === 'secondary') {
        return (
            <button className={`${styles.btn} ${styles.btnSecondary}`}>
                {text}
            </button>
        );
    }
    else {
        return (
            <button className={styles.btn}>
                {text}
            </button>
        );
    }
}