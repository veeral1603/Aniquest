import styles from "../Components/CSS/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import PrimaryButton from "./PrimaryButton";
import SearchBar from "./SearchBar";
import { SidebarMenu } from "./SidebarMenu";
import { useEffect, useState } from "react";
import DropdownSearchbar from "./DropdownSearchbar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((isOpen) => !isOpen);
    setIsMobileSearchOpen(() => false);
  }

  function toggleMobileSearch() {
    setIsMobileSearchOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.fixed : ""}`}>
        <div className={styles.logoContainer}>
          <button className={styles.menuButton} onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link to={"/"}>
            <img src={Logo} />
          </Link>
        </div>

        <SearchBar filterBtn={true} />

        <div className={styles.navLinksContainer}>
          <div className={styles.mobileSearchBtnContainer}>
            <button onClick={toggleMobileSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          <div className={styles.navLinks}>
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/trending"}>Trending</NavLink>
              </li>
              <li>
                <NavLink to={"/tv-shows"}>TV Shows</NavLink>
              </li>
              <li>
                <NavLink to={"/movies"}>Movies</NavLink>
              </li>
            </ul>
          </div>

          <NavLink to={"/watch-list"}>
            <PrimaryButton padding="8px 16px">Watch List</PrimaryButton>
          </NavLink>
        </div>
      </nav>

      <SidebarMenu
        toggleMobileMenu={toggleMobileMenu}
        isOpen={isMobileMenuOpen}
      />

      {isMobileSearchOpen && (
        <DropdownSearchbar
          isOpen={isMobileSearchOpen}
          setIsOpen={setIsMobileSearchOpen}
        />
      )}
    </>
  );
}
