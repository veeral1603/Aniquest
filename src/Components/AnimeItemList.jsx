/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/AnimeItemList.module.css";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function AnimeItemList({ data }) {
  const {
    images: {
      jpg: { large_image_url },
    },
    title_english,
    type,
    episodes,
  } = data;

  return (
    <div className={styles.AnimeItemList}>
      <div className={styles.CoverContainer}>
        <img src={large_image_url} loading="lazy" />
      </div>
      <div className={styles.ListText}>
        <p className={styles.Title}>{title_english}</p>
        <p className={styles.Info}>
          <span className={styles.Tag}>
            <FontAwesomeIcon icon={faCirclePlay} /> {episodes ? episodes : "?"}
          </span>
          <span className={styles.dot}></span>
          {type}
        </p>
      </div>
    </div>
  );
}
