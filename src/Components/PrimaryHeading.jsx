/* eslint-disable react/prop-types */
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./CSS/PrimaryHeading.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function PrimaryHeading({ children, moreBtn = false }) {
  return (
    <div className={styles.PrimaryHeadingContainer}>
      <h2 className={styles.PrimaryHeading}>{children}</h2>
      {moreBtn && (
        <button className={styles.viewMoreBtn}>
          <Link to={`/${children.split(" ").join("-").toLowerCase()}`}>
            View More <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </button>
      )}
    </div>
  );
}
