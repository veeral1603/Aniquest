/* eslint-disable react/prop-types */

import AnimeItemSmall from "./AnimeItemSmall";
import styles from "./CSS/UpcomingAnimeSection.module.css";
import PrimaryHeading from "./PrimaryHeading";
import SidebarAdArea from "./SidebarAdArea";
import GenresContainer from "./GenresContainer";
import { useState } from "react";

export default function UpcomingAnimeSection({ data }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const dataFiltered = data.filter(
    (anime, index, self) =>
      self.findIndex((a) => a.mal_id === anime.mal_id) === index
  );

  return (
    <section className={`container ${styles.UpcomingAnimeSection}`}>
      <PrimaryHeading moreBtn={true} btnLink={`upcoming`}>
        Upcoming Anime
      </PrimaryHeading>
      <div className={styles.ContentContainer}>
        <div className={styles.AnimeContainer}>
          {dataFiltered.slice(0, 12).map((anime, i) => {
            {
              return (
                <AnimeItemSmall
                  data={anime}
                  key={i}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                />
              );
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
