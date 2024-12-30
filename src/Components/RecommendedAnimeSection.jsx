/* eslint-disable react/prop-types */

import AnimeItemSmall from "./AnimeItemSmall";
import styles from "./CSS/RecommendedAnimeSection.module.css";
import GenresContainer from "./GenresContainer";
import PrimaryHeading from "./PrimaryHeading";
import SidebarAdArea from "./SidebarAdArea";

export default function RecommendedAnimeSection() {
  return (
    <section className={`${styles.recommendedAnimeSection} container`}>
      <PrimaryHeading moreBtn={false}>Recommended For You</PrimaryHeading>
      <div className={styles.ContentContainer}>
        <div className={styles.AnimeContainer}></div>
        <div className={styles.GenresContainer}>
          <SidebarAdArea />

          <PrimaryHeading>Genres</PrimaryHeading>

          <GenresContainer />
        </div>
      </div>
    </section>
  );
}
