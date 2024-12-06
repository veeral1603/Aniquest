/* eslint-disable react/prop-types */

import AnimeItemSmall from "./AnimeItemSmall";
import styles from "./CSS/UpcomingAnimeSection.module.css";
import PrimaryHeading from "./PrimaryHeading";
import SidebarAdArea from "./SidebarAdArea";
import GenresContainer from "./GenresContainer";

export default function UpcomingAnimeSection({ data }) {
  return (
    <section className={`container ${styles.UpcomingAnimeSection}`}>
      <PrimaryHeading moreBtn={true}>Top Upcoming</PrimaryHeading>
      <div className={styles.ContentContainer}>
        <div className={styles.AnimeContainer}>
          {data.map((anime, i) => {
            {
              return <AnimeItemSmall data={anime} key={i} />;
            }
          })}
        </div>
        <div className={styles.GenresContainer}>
          <SidebarAdArea />

          <PrimaryHeading>Genres</PrimaryHeading>

          <GenresContainer />
        </div>
      </div>
    </section>
  );
}
