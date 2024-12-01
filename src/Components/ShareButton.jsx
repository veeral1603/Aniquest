/* eslint-disable react/prop-types */
import styles from "./CSS/ShareButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export default function ShareButton({ children }) {
  const currentURL = window.location.href;

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AniQuest - Discover Latest Anime",
          text: "This is a great website to discover new anime.",
          url: currentURL,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <button onClick={shareContent} className={styles.shareButton}>
      <FontAwesomeIcon icon={faShare} />
      {children}
    </button>
  );
}
