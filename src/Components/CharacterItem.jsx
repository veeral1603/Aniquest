/* eslint-disable react/prop-types */

import styles from "./CSS/CharacterItem.module.css";
import userPic from "../assets/User.webp";
import { useNavigate } from "react-router-dom";

export default function CharacterItem({ char }) {
  const {
    name,
    images: {
      webp: { image_url },
    },
  } = char.character;

  const role = char.role;

  const voiceActor = char.voice_actors[0];
  const voiceActorLanguage = voiceActor?.language;

  const voiceActorName = voiceActor?.person
    ? voiceActor?.person.name
    : "Unknown";

  const voiceActorImage = voiceActor?.person
    ? voiceActor?.person?.images?.jpg?.image_url
    : userPic;

  return (
    <div className={styles.characterItem}>
      <div className={styles.character}>
        <div className={styles.characterIconContainer}>
          <img src={image_url} />
        </div>

        <div className={styles.characterInfo}>
          <p className={styles.characterName}>{name.replace(",", "")}</p>
          <p className={styles.characterRole}>{role}</p>
        </div>
      </div>

      <div className={styles.voiceActor}>
        <div className={styles.voiceActorIconContainer}>
          <img src={voiceActorImage} />
        </div>
        <div className={styles.voiceActorInfo}>
          <p className={styles.voiceActorName}>
            {voiceActorName.replace(",", "")}
          </p>
          <p className={styles.voiceActorRole}>
            {voiceActorLanguage ? voiceActorLanguage : "Japanese"}
          </p>
        </div>
      </div>
    </div>
  );
}
