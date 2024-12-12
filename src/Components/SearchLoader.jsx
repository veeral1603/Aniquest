import styles from "./CSS/SearchLoader.module.css";

export default function SearchLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}
