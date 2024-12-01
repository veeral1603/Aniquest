import sharegif from "../assets/Share.gif";
import styles from "./CSS/ShareSection.module.css";

export default function ShareSection() {
  return (
    <section className={`container ${styles.ShareSection}`}>
      <div className={styles.ShareContainer}>
        <div className={styles.GifContainer}>
          <img src={sharegif} />
        </div>
        <div className={styles.ShareText}>
          <h3>Share AniQuest</h3>
          <p>With your friends!</p>
        </div>
      </div>
    </section>
  );
}
