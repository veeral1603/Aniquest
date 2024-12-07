import { Link } from "react-router-dom";
import styles from "./CSS/GenresContainer.module.css";

export default function GenresContainer() {
  const genres = [
    { name: "Action", id: 1 },
    { name: "Adventure", id: 2 },
    { name: "Avant Garde", id: 5 },
    { name: "Award Winning", id: 46 },
    { name: "Boys Love", id: 28 },
    { name: "Comedy", id: 4 },
    { name: "Drama", id: 8 },
    { name: "Fantasy", id: 10 },
    { name: "Girls Love", id: 26 },
    { name: "Gourmet", id: 47 },
    { name: "Horror", id: 14 },
    { name: "Mystery", id: 7 },
    { name: "Romance", id: 22 },
    { name: "Sci-Fi", id: 24 },
    { name: "Slice of Life", id: 36 },
    { name: "Sports", id: 30 },
    { name: "Supernatural", id: 37 },
    { name: "Suspense", id: 41 },
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
                <Link
                  to={`/genre/${genre.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}/${genre.id}?page=1`}
                >
                  {genre.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
