/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/DropdownSearchbar.module.css";
import SearchBar from "./SearchBar";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function DropdownSearchbar({ isOpen, setIsOpen }) {
  return (
    <div className={`${styles.dropdownSearchbar}`}>
      <Link to={"/filter"} onClick={() => setIsOpen(false)}>
        <button className={styles.filterBtn}>
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </Link>
      <SearchBar filterBtn={false} />
    </div>
  );
}
