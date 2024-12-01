/* eslint-disable react/prop-types */

import styles from "./CSS/SearchBar.module.css";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchBar({ width, filterBtn = false }) {
  const searchBarStyles = { width: width };

  const [query, setQuery] = useState("");

  return (
    <div className={styles.searchBar} style={width ? searchBarStyles : {}}>
      <form>
        <input
          type="text"
          placeholder="Search Anime"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.searchBarBtns}>
          {filterBtn && (
            <Link to={"/filter"}>
              <button className={styles.filterBtn}>
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </Link>
          )}
          <PrimaryButton radius="4px" padding="8px">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
