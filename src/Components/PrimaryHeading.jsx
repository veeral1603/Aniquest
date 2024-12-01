/* eslint-disable react/prop-types */
import styles from "./CSS/PrimaryHeading.module.css";

export default function PrimaryHeading({ children }) {
  return (
    <div className={styles.PrimaryHeadingContainer}>
      <h2 className={styles.PrimaryHeading}>{children}</h2>
    </div>
  );
}
