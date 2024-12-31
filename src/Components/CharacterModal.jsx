/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/CharacterModal.module.css";
import PrimaryHeading from "./PrimaryHeading";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import CharacterItem from "./CharacterItem";

export default function CharacterModal({ isViewAll, closeModal, data }) {
  return (
    <>
      <div
        className={`${styles.characterModal} ${isViewAll ? styles.active : ""}`}
      >
        <div className={`${styles.modalContent} `}>
          <div className={styles.modalHeader}>
            <PrimaryHeading>Characters & Voice Actors</PrimaryHeading>

            <button className={styles.modalCloseBtn} onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>

          <div className={styles.modalMain}>
            <div className={styles.characterContainer}>
              {data.map((char, i) => {
                {
                  return (
                    <CharacterItem
                      char={char}
                      key={i}
                      closeModal={closeModal}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
