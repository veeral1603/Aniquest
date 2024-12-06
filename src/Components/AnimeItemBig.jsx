/* eslint-disable react/prop-types */

import styles from "./CSS/AnimeItemBig.module.css";
import { useNavigate } from "react-router-dom";

export default function AnimeItemBig({ data, rank }) {
  const {
    images: {
      webp: { large_image_url },
    },
    title_english,
    title,
  } = data;

  const navigate = useNavigate();

  return (
    <div className={styles.AnimeItem} onClick={() => navigate("/anime")}>
      <div className={styles.CoverContainer}>
        <img src={large_image_url} />
        <span>{String(rank).length == 1 ? `0${rank}` : rank}</span>
      </div>
      <div className={styles.TitleContainer}>
        <p>{String(rank).length == 1 ? `0${rank}` : rank}</p>
        <p className={styles.Title}>{title_english ? title_english : title}</p>
      </div>
    </div>
  );
}
