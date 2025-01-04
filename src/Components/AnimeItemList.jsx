/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/AnimeItemList.module.css";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AnimeItemList({
  data,
  setIsResultOpen,
  setQuery,
  setIsMobileSearchOpen,
}) {
  const {
    images: {
      webp: { large_image_url },
    },
    title_english,
    title,
    type,
    episodes,
    duration,
    mal_id,
  } = data;

  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/anime/${mal_id}`);
        setIsMobileSearchOpen(false);
        setQuery("");
        setIsResultOpen(false);
      }}
    >
      <div className={styles.AnimeItemList}>
        <div className={styles.CoverContainer}>
          <img src={large_image_url} loading="lazy" />
        </div>
        <div className={styles.ListText}>
          <p className={styles.Title}>
            {title_english ? title_english : title}
          </p>
          <p className={styles.Info}>
            <span className={styles.Tag}>
              <FontAwesomeIcon icon={faCirclePlay} />{" "}
              {episodes ? episodes : "Airing"}
            </span>
            <span className={styles.dot}></span>
            {type}
            <span className={styles.dot}></span>
            {duration ? duration : "? min"}
          </p>
        </div>
      </div>
    </li>
  );
}
