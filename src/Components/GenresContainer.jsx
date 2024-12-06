/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CSS/GenresContainer.module.css";

export default function GenresContainer() {
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

  return (
    <div className={styles.GenresContainer}>
      <ul className={styles.GenreList}>
        {genres.map((genre, i) => {
          {
            return (
              <li style={{ color: getRandomColor() }} key={i}>
                <Link to={`genre/${genre.split(" ").join("-").toLowerCase()}`}>
                  {genre}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
