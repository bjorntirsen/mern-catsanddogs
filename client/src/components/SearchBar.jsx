import React from "react";
import styles from "../styles/SearchBar.module.css"; // Import css modules stylesheet as styles

export default function SearchBar({ products }) {
  return (
    <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
    </div>
  )
}
