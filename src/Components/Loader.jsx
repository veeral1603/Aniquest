import styles from "./CSS/Loader.module.css";
import loader from "../assets/Loader.gif";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <img src={loader} />
    </div>
  );
}
