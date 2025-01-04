import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/ScrollToTopBtn.module.css";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function ScrollToTopBtn() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    isScrolled && (
      <div className={styles.scrollToTopContainer}>
        <button onClick={ScrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
    )
  );
}
