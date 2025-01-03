/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from "./CSS/AnimeItemSmall.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faEllipsisVertical,
  faPlus,
  faPlusCircle,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import {
  saveToWatchList,
  checkIfExist,
  deleteFromWatchList,
} from "../Pages/WatchList";
import { toast, Bounce } from "react-toastify";

const toastSettings = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    fontFamily: "inherit",
    backgroundColor: "#1f1f2e",
    border: "1px solid #242435",
    fontWeight: "500",
  },
  transition: Bounce,
};

export default function AnimeItemSmall({
  data,
  animeType = "s",
  setWatchListData,
}) {
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

  const trailerUrl = data?.trailer?.url;

  const watchListData = {
    images: {
      webp: {
        large_image_url,
      },
    },
    title_english,
    title,
    episodes,
    type,
    duration,
    rating,
    mal_id,
    trailer: { url: trailerUrl },
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const isExist = checkIfExist(watchListData);

  const [existsInWatchList, setExistsInWatchList] = useState(isExist);

  const shareAnime = async (animeId) => {
    // const URL =
    //   "https://" + window.location.href.split("/")[2] + `/anime/${animeId}`;

    const URL = `https://aniquest-eta.vercel.app/anime/${animeId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "AniQuest - Discover Latest Anime",
          text: "Check this Anime out!",
          url: URL,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const navigate = useNavigate();

  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".menuContainer")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`${styles.AnimeItem}`}
      onClick={() => navigate(`/anime/${mal_id}`)}
    >
      <div className={styles.CoverContainer}>
        <img src={large_image_url} loading="lazy" />
        {rating && (
          <div className={styles.ratingTag}>{rating.split(" ")[0]}</div>
        )}
      </div>
      <div className={styles.infoContainer}>
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

        <div className={styles.menuBtnContainer}>
          <button
            className={styles.menuBtn}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(mal_id);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>

          {openMenuId === mal_id && (
            <div className={`${styles.menuContainer} `}>
              <ul className={styles.menuList}>
                {trailerUrl && (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <a href={trailerUrl} target="_blank_">
                      <button>
                        <FontAwesomeIcon icon={faCirclePlay} /> Trailer
                      </button>
                    </a>
                  </li>
                )}
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    shareAnime(mal_id);
                  }}
                >
                  <button>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    if (existsInWatchList) {
                      // Remove From List
                      deleteFromWatchList(data);
                      setExistsInWatchList(false);
                      toast(`Removed from watchlist!`, toastSettings);
                      setWatchListData(
                        JSON.parse(localStorage.getItem("watchlist"))
                      );
                      return;
                    }
                    // Add from list
                    saveToWatchList(data);
                    setExistsInWatchList(true);
                    toast(`Added to watchlist!`, toastSettings);
                  }}
                >
                  <button>
                    {existsInWatchList ? (
                      <>
                        <FontAwesomeIcon icon={faTrash} />
                        Remove from watchlist
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlus} />
                        Add to watchlist
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
