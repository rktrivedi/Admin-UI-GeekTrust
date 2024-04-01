import React from "react";
import styles from "./SearchBar.module.css";

const Search = ({onSearch}) => {
  return (
    <input
      type="text"
      placeholder="Search By Name, Email or Role"
      className={styles.search}
      onChange={onSearch}
    />
  );
};

export default Search;
