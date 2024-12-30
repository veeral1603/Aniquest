/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from "./CSS/AnimeItemSmall.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function AnimeItemSmall({ data, animeType = "s" }) {
  const {
    images: {
      webp: { large_image_url },
    },
    title,
    title_english,
    episodes,
    type,
    duration,
    rating,
    mal_id,
  } = data;

  const navigate = useNavigate();

  return (
    <div
      className={styles.AnimeItem}
      onClick={() => navigate(`/anime/${mal_id}`)}
    >
      <div className={styles.CoverContainer}>
        <img src={large_image_url} loading="lazy" />
        {rating && (
          <div className={styles.ratingTag}>{rating.split(" ")[0]}</div>
        )}
      </div>
      <div className={styles.TitleContainer}>
        <h3 className={styles.Title}>
          {title_english ? title_english : title}
        </h3>

        <p className={styles.Info}>
          {animeType == "s" && (
            <>
              <span className={styles.Tag}>
                <FontAwesomeIcon icon={faCirclePlay} />{" "}
                {episodes ? episodes : "? eps"}
              </span>
              <span className={styles.dot}></span>
            </>
          )}
          {type ? type : " ?"}
          {animeType == "m" && (
            <>
              <span className={styles.dot}></span>
              {duration ? `${duration}` : "?m"}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
