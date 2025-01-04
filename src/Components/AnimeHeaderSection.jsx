/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/AnimeHeaderSection.module.css";
import {
  faCirclePlay,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  saveToWatchList,
  checkIfExist,
  deleteFromWatchList,
} from "../Pages/WatchList";
import { Bounce, toast } from "react-toastify";

function capitalizeFirstLetter(word) {
  if (!word) return ""; // Handle empty or undefined input
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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

export default function AnimeHeaderSection({ data }) {
  const [fullSynopsis, setFullSynopsis] = useState(false);

  const {
    images: {
      webp: { large_image_url },
    },
    title_english,
    title_japanese,
    title_synonyms,
    title,
    type,
    episodes,
    duration,
    synopsis,
    mal_id,
    status,
    aired: { string },
    year,
    season,
    score,
    genres,
    studios,
    producers,
    rating,
    trailer: { url: trailerUrl },
  } = data;

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

  const isExist = checkIfExist(watchListData);

  const [existsInWatchList, setExistsInWatchList] = useState(isExist);

  // data = watchListData
  const addToWatchList = (data) => {
    saveToWatchList(data);
    setExistsInWatchList(true);
    toast(`Added to watchlist!`, toastSettings);
  };

  const removeFromWatchList = (data) => {
    deleteFromWatchList(data);
    setExistsInWatchList(false);
    toast(`Removed from watchlist!`, toastSettings);
  };

  // Page Title
  useEffect(() => {
    document.title = `${
      data.title_english ? data.title_english : data.title
    } - AniQuest`;
  }, [data]);

  return (
    <section className={` ${styles.animeHeader}`}>
      <div className={styles.coverWrap}>
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${large_image_url})` }}
        ></div>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.innerWrapper}>
          <div className={styles.coverContainer}>
            <img src={large_image_url} loading="lazy" />
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.animeTitle}>
                {title_english ? title_english : title}
              </h3>
            </div>

            <div className={styles.metaContainer}>
              <span className={styles.Tag}>
                <FontAwesomeIcon icon={faCirclePlay} />
                {episodes ? episodes : "Airing"}
              </span>
              <span className={styles.dot}></span>
              <span>{type}</span>

              <span className={styles.dot}></span>
              {duration ? duration : "?min"}
            </div>

            <div className={styles.btnsContainer}>
              {trailerUrl && (
                <a
                  href={trailerUrl ? trailerUrl : "/"}
                  target="_blank"
                  className={styles.trailerBtn}
                  disabled="disabled"
                >
                  <FontAwesomeIcon icon={faCirclePlay} />
                  Trailer
                </a>
              )}

              <button
                onClick={() => {
                  if (existsInWatchList) {
                    removeFromWatchList(watchListData);
                    return;
                  }

                  addToWatchList(watchListData);
                }}
              >
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
            </div>

            <div className={styles.synopsisContainer}>
              <p>
                {synopsis
                  ? fullSynopsis
                    ? synopsis
                    : synopsis.slice(0, 600) + "..."
                  : "No synopsis available."}
                {synopsis.length > 600 && (
                  <button
                    className={styles.showMoreBtn}
                    onClick={() => setFullSynopsis((cur) => !cur)}
                  >
                    {fullSynopsis ? "- Less" : "+ More"}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.outerWrapper}>
          <div className={styles.detailsContainerSide}>
            <div className={styles.item}>
              <span className={styles.itemHeading}>Japanese: </span>
              <span className={styles.itemContent}>{title_japanese}</span>
            </div>

            {title_synonyms.length > 0 && (
              <div className={styles.item}>
                <span className={styles.itemHeading}>Synonyms: </span>
                <span className={styles.itemContent}>
                  {title_synonyms.join(", ")}
                </span>
              </div>
            )}

            <div className={styles.item}>
              <span className={styles.itemHeading}>Aired: </span>
              <span className={styles.itemContent}>{string}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>Premiered: </span>
              <span className={styles.itemContent}>
                {capitalizeFirstLetter(season)} {year}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>Duration: </span>
              <span className={styles.itemContent}>{duration}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>Status: </span>
              <span className={styles.itemContent}>{status}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>MAL Score: </span>
              <span className={styles.itemContent}>{score ? score : "?"}</span>
            </div>

            <div className={`${styles.item} ${styles.itemList}`}>
              <span className={styles.itemHeading}>Genres: </span>
              {genres.map((genre, i) => {
                {
                  return (
                    <Link
                      to={`/genre/${genre.name.toLowerCase()}/${
                        genre.mal_id
                      }?page=1`}
                      key={i}
                    >
                      {genre.name}
                    </Link>
                  );
                }
              })}
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>Studios: </span>
              <span className={styles.itemContent}>
                {studios.map((studio, i) => {
                  {
                    return (
                      <span key={i}>
                        {studio.name} {i < studios.length - 1 ? ", " : ""}
                      </span>
                    );
                  }
                })}
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.itemHeading}>Producers: </span>
              <span className={styles.itemContent}>
                {producers.map((producer, i) => {
                  {
                    return (
                      <span key={i}>
                        {producer.name} {i < producers.length - 1 ? ", " : ""}
                      </span>
                    );
                  }
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.outerWrapperMain}>
        <div className={styles.detailsContainerSide}>
          <div className={`${styles.item} ${styles.synopsisHidden}`}>
            <span className={styles.itemHeading}>Overview: </span>
            <div className={styles.synopsisText}>
              <p>{synopsis ? synopsis : "No overview available."}</p>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Japanese: </span>
            <span className={styles.itemContent}>
              {title_japanese ? title_japanese : "?"}
            </span>
          </div>

          {title_synonyms.length > 0 && (
            <div className={styles.item}>
              <span className={styles.itemHeading}>Synonyms: </span>
              <span className={styles.itemContent}>
                {title_synonyms ? title_synonyms.join(", ") : "No synonyms"}
              </span>
            </div>
          )}

          <div className={styles.item}>
            <span className={styles.itemHeading}>Aired: </span>
            <span className={styles.itemContent}>{string ? string : "?"}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Premiered: </span>
            <span className={styles.itemContent}>
              {year ? `${capitalizeFirstLetter(season)} ${year}` : "?"}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Duration: </span>
            <span className={styles.itemContent}>
              {duration ? duration : "?"}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Status: </span>
            <span className={styles.itemContent}>{status ? status : "?"}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>MAL Score: </span>
            <span className={styles.itemContent}>{score ? score : "?"}</span>
          </div>

          <div className={`${styles.item} ${styles.itemList}`}>
            <span className={styles.itemHeading}>Genres: </span>
            {genres
              ? genres.map((genre, i) => {
                  {
                    return (
                      <Link
                        to={`/genre/${genre.name.toLowerCase()}/${
                          genre.mal_id
                        }?page=1`}
                        key={i}
                      >
                        {genre.name}
                      </Link>
                    );
                  }
                })
              : "No Information."}
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Studios: </span>
            <span className={styles.itemContent}>
              {studios
                ? studios.map((studio, i) => {
                    {
                      return (
                        <span key={i}>
                          {studio.name} {i < studios.length - 1 ? ", " : ""}
                        </span>
                      );
                    }
                  })
                : "No Information."}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.itemHeading}>Producers: </span>
            <span className={styles.itemContent}>
              {producers
                ? producers.map((producer, i) => {
                    {
                      return (
                        <span key={i}>
                          {producer.name} {i < producers.length - 1 ? ", " : ""}
                        </span>
                      );
                    }
                  })
                : "No Information."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
