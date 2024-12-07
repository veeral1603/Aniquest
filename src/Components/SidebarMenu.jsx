/* eslint-disable react/prop-types */
import styles from "./CSS/SidebarMenu.module.css";
import ShareButton from "./ShareButton";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "./PrimaryButton";

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
const sideNavLinks = [
  "Trending",
  "TV Shows",
  "Movies",
  "Upcoming",
  "OVA",
  "ONA",
];

export function SidebarMenu({ toggleMobileMenu, isOpen }) {
  return (
    <>
      <div
        className={`${styles.sidebarMenu_bg} ${isOpen ? styles.active : ""}`}
        onClick={toggleMobileMenu}
      ></div>
      <div
        className={`${styles.sidebarMenu} ${
          isOpen ? styles.active : ""
        } sideNav`}
      >
        <div className={styles.closeMenuBtnContainer}>
          <button className={styles.closeMenuBtn} onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faChevronLeft} /> Close Menu
          </button>

          <NavLink to={"/watch-list"} onClick={toggleMobileMenu}>
            <PrimaryButton padding="6px 16px">Watch List</PrimaryButton>
          </NavLink>
        </div>

        <div className={styles.shareContainer}>
          <p>
            <span>Share AniQuest</span> to your friends
          </p>
        </div>

        <div className={styles.shareBtnContainer}>
          <ShareButton>Share Now</ShareButton>
        </div>

        <ul className={styles.sidebarMenuList}>
          <li onClick={toggleMobileMenu}>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {sideNavLinks.map((item, index) => (
            <li key={index} onClick={toggleMobileMenu}>
              <NavLink to={`/${item.replace(" ", "-").toLowerCase()}`}>
                {item}
              </NavLink>
            </li>
          ))}

          <li>
            <div className={styles.navLink}>
              <strong>Genre</strong>
            </div>

            <div className={styles.subMenu}>
              <ul className={styles.genreList}>
                {genres.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      color: getRandomColor(), // Apply random color to text
                    }}
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      to={`/genre/${item.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}/${item.id}?page=1`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <p className={styles.credits}>
          A React project made by
          <a href="" target="_blank">
            {" "}
            Veeral Narang
          </a>
        </p>
      </div>
    </>
  );
}
