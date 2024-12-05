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

const subMenuItems = [
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

const sideNavLinks = [
  "Trending",
  "TV Shows",
  "Movies",
  "Upcoming",
  "Subbed Anime",
  "Dubbed Anime",
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
                {subMenuItems.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      color: getRandomColor(), // Apply random color to text
                    }}
                    onClick={toggleMobileMenu}
                  >
                    <Link
                      to={`/genre/${item.split(" ").join("-").toLowerCase()}`}
                    >
                      {item}
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
