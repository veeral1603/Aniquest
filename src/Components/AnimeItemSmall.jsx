/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from "./CSS/AnimeItemSmall.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function AnimeItemSmall({ data }) {
  const {
    images: {
      webp: { large_image_url },
    },
    title_english,
    episodes,
    type,
  } = data;

  const navigate = useNavigate();

  return (
    <div className={styles.AnimeItem} onClick={() => navigate("/anime")}>
      <div className={styles.CoverContainer}>
        <img src={large_image_url} loading="lazy" />
      </div>
      <div className={styles.TitleContainer}>
        <p className={styles.Title}>
          {title_english ? title_english.slice(0, 15) + "..." : "UnNamed"}
        </p>

        <p className={styles.Info}>
          <span className={styles.Tag}>
            <FontAwesomeIcon icon={faCirclePlay} /> {episodes ? episodes : "?"}
          </span>
          <span className={styles.dot}></span>
          {type ? type : " ?"}
        </p>
      </div>
    </div>
  );
}
