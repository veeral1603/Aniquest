/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import CharacterItem from "./CharacterItem";
import styles from "./CSS/CharactersSection.module.css";
import PrimaryHeading from "./PrimaryHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CharacterModal from "./CharacterModal";

export default function CharactersSection({ data }) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = () => {
    // Save the current scroll position
    setScrollPosition(window.scrollY);

    // Add styles to fix the body position
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";

    setIsViewAll(true);
  };

  const closeModal = () => {
    // Remove fixed body styles and restore scroll position
    document.body.style.position = "relative";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition); // Restore the saved scroll position
    setIsViewAll(false);
  };

  return (
    <section className={`${styles.charactersSection} container`}>
      <PrimaryHeading moreBtn={false}>Characters & Voice Actors</PrimaryHeading>

      <div className={styles.contentContainer}>
        <div className={styles.charactersContainer}>
          {data.slice(0, 12).map((char, i) => {
            {
              return <CharacterItem key={i} char={char} />;
            }
          })}
        </div>

        {data.length > 12 && (
          <button className={styles.viewAllBtn} onClick={openModal}>
            {isViewAll ? "View Less " : "View All "}
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>

      <CharacterModal
        isViewAll={isViewAll}
        closeModal={closeModal}
        data={data}
      />
    </section>
  );
}
