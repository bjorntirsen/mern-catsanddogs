import React from "react";
import searchIcon from "../search-icon.svg";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({ products }) {
  return (
    <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
            <input type="text" placeholder="Search..." name="search"/>
            <button type="submit"><img className={`${styles.cart}`} src={searchIcon} alt="search-icon" /></button>
        </div>
    </div>
  )
}
