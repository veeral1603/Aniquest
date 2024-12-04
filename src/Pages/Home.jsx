import { useEffect, useState } from "react";
import "./CSS/Home.css";
import FeaturedSlider from "../Components/FeaturedSlider";
import PrimaryHeading from "../Components/PrimaryHeading";
import Loader from "../Components/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import ShareSection from "../Components/ShareSection";
import AnimeItemList from "../Components/AnimeItemList";
import { Link } from "react-router-dom";
import TrendingAnimeSection from "../Components/TrendingAnimeSection";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [featuredSliderList, setFeaturedSliderList] = useState([]);
  const [trendingAnimeList, setTrendingAnimeList] = useState([]);
  const [airingAnimeList, setAiringAnimeList] = useState([]);
  const [mostPopularAnimeList, setMostPopularAnimeList] = useState([]);
  const [mostFavoriteAnimeList, setMostFavoriteAnimeList] = useState([]);
  const [recentEpisodesList, setRecentEpisodesList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  const fetchWithDelay = async (urls, delay) => {
    const results = [];
    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      results.push(data.data);

      await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay between calls
    }

    return results;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const urls = [
        "https://api.jikan.moe/v4/top/anime?filter=favorite&sfw=true&limit=10&page=3", //Featued Slider
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=16&page=2", //Trending Anime
        "https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true&limit=5", //Top Airing
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=5", //Most Popular
        "https://api.jikan.moe/v4/top/anime?filter=favorite&sfw=true&limit=5", //Most Favorite
        "https://api.jikan.moe/v4/seasons/now?sfw&limit=5", //Latest Episodes
        "https://api.jikan.moe/v4/genres/anime?filter=genres", //Genres List
      ];

      try {
        const [
          featuredSliderListData,
          trendingAnimeListData,
          airingAnimeListData,
          mostPopularAnimeListData,
          mostFavoriteAnimeListData,
          recentEpisodesListData,
          genresListData,
        ] = await fetchWithDelay(urls, 400);

        setFeaturedSliderList(featuredSliderListData);
        setTrendingAnimeList(trendingAnimeListData);
        setAiringAnimeList(airingAnimeListData);
        setMostPopularAnimeList(mostPopularAnimeListData);
        setMostFavoriteAnimeList(mostFavoriteAnimeListData);
        setRecentEpisodesList(recentEpisodesListData);
        setGenresList(genresListData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <FeaturedSlider data={featuredSliderList} />
      <main>
        <TrendingAnimeSection data={trendingAnimeList} />

        <ShareSection />

        <section className="container featured-anime-section">
          <div className="featured-column">
            <PrimaryHeading>Top Airing</PrimaryHeading>
            <ul className="column-list">
              {airingAnimeList.map((anime, i) => {
                return (
                  <li key={i}>
                    <AnimeItemList data={anime} />
                  </li>
                );
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
                return (
                  <li key={i}>
                    <AnimeItemList data={anime} />
                  </li>
                );
              })}

              <li>
                <Link to={"top-airing"}>
                  View More <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="featured-column">
            <PrimaryHeading>Most Favorite</PrimaryHeading>
            <ul className="column-list">
              {mostFavoriteAnimeList.map((anime, i) => {
                return (
                  <li key={i}>
                    <AnimeItemList data={anime} />
                  </li>
                );
              })}

              <li>
                <Link to={"top-airing"}>
                  View More <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="featured-column">
            <PrimaryHeading>Recent Episodes</PrimaryHeading>
            <ul className="column-list">
              {recentEpisodesList.map((anime, i) => {
                return (
                  <li key={i}>
                    <AnimeItemList data={anime} />
                  </li>
                );
              })}

              <li>
                <Link to={"top-airing"}>
                  View More <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
