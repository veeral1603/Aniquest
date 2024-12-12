/* eslint-disable react/prop-types */

import styles from "./CSS/FeaturedAnimeSection.module.css";

import AnimeItemList from "./AnimeItemList";
import PrimaryHeading from "./PrimaryHeading";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function FeaturedAnimeSection({
  airingAnimeList,
  mostPopularAnimeList,
  mostFavoriteAnimeList,
  recentEpisodesList,
}) {
  return (
    <section className={`container ${styles.FeaturedAnimeSection}`}>
      <div className={"featured-column"}>
        <PrimaryHeading>Top Airing</PrimaryHeading>
        <ul className="column-list">
          {airingAnimeList.map((anime, i) => {
            return <AnimeItemList data={anime} key={i} />;
          })}

          <li>
            <Link to={"top-airing"}>
              View More <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
        </ul>
      </div>

      <div className="featured-column">
        <PrimaryHeading>Most Popular</PrimaryHeading>
        <ul className="column-list">
          {mostPopularAnimeList.map((anime, i) => {
            return <AnimeItemList data={anime} key={i} />;
          })}

          <li>
            <Link to={"most-popular"}>
              View More <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
        </ul>
      </div>

      <div className="featured-column">
        <PrimaryHeading>Most Favorite</PrimaryHeading>
        <ul className="column-list">
          {mostFavoriteAnimeList.map((anime, i) => {
            return <AnimeItemList data={anime} key={i} />;
          })}

          <li>
            <Link to={"most-favorite"}>
              View More <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
        </ul>
      </div>

      <div className="featured-column">
        <PrimaryHeading>Recent Episodes</PrimaryHeading>
        <ul className="column-list">
          {recentEpisodesList.map((anime, i) => {
            return <AnimeItemList data={anime} key={i} />;
          })}

          <li>
            <Link to={"recent-episodes"}>
              View More <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
