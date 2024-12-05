/* eslint-disable react/prop-types */

import AnimeItemSmall from "./AnimeItemSmall";
import styles from "./CSS/UpcomingAnimeSection.module.css";
import PrimaryHeading from "./PrimaryHeading";
import { Link } from "react-router-dom";

const genres = [
  "Action",
  "Adventure",
  "Avant Garde",
  "Award Winning",
  "Boys Love",
  "Comedy",
  "Drama",
  "Fantasy",
  "Girls Love",
  "Gourmet",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Suspense",
];

const pastelColors = [
  "#FFB3BA", // Soft Red
  "#FFDFBA", // Soft Orange
  "#FFFFBA", // Soft Yellow
  "#BAFFC9", // Soft Green
  "#BAE1FF", // Soft Blue
  "#E2B2FF", // Soft Purple
  "#FFCCE5", // Soft Pink
  "#C9C9FF", // Lavender
  "#D4F0F0", // Pale Cyan
  "#F4D4BA", // Light Peach
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};

export default function UpcomingAnimeSection({ data }) {
  return (
    <section className={`container ${styles.UpcomingAnimeSection}`}>
      <PrimaryHeading moreBtn={true}>Top Upcoming</PrimaryHeading>
      <div className={styles.ContentContainer}>
        <div className={styles.AnimeContainer}>
          {data.map((anime, i) => {
            {
              return <AnimeItemSmall data={anime} key={i} />;
            }
          })}
        </div>
        <div className={styles.GenresContainer}>
          <div className={styles.adArea}>
            <div>
              <h3>Contact For Advertisement</h3>
              <p>xyz@gmail.com</p>
            </div>
          </div>

          <PrimaryHeading>Genres</PrimaryHeading>

          <div className={styles.GenresInnerContainer}>
            <ul className={styles.GenreList}>
              {genres.map((genre, i) => {
                {
                  return (
                    <li style={{ color: getRandomColor() }} key={i}>
                      <Link
                        to={`genre/${genre.split(" ").join("-").toLowerCase()}`}
                      >
                        {genre}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
