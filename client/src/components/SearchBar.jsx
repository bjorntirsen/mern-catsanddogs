import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import searchIcon from "../search-icon.svg";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({ products }) {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const search = (event) => {
    event.preventDefault();
    const filtered = products.filter((product) => {
      if (searchTerm === "") return null;
      if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return product;
      }
      return null;
    });

    if (filtered.length === 1) {
      history.push(`/products/${filtered[0].slug}`);
    } else {
      history.push(`/products/${searchTerm}`);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Search..."
          name="search"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button onClick={search} type="button">
          <img
            className={`${styles.cart}`}
            src={searchIcon}
            alt="search-icon"
          />
        </button>
      </div>
      <ul>
        {products
          .filter((product) => {
            if (searchTerm === "") return null;
            if (product.title.toLowerCase().includes(searchTerm.toLowerCase()))
              return product;
            return null;
          })
          .map((product) => (
            <Link key={product._id} to={`/products/${product.slug}`}>
              <li>{product.title}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
