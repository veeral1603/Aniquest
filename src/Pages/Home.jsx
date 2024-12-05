import { useEffect, useState } from "react";
import "./CSS/Home.css";
import FeaturedSlider from "../Components/FeaturedSlider";
import PrimaryHeading from "../Components/PrimaryHeading";
import Loader from "../Components/Loader";

import ShareSection from "../Components/ShareSection";

import Footer from "../Components/Footer";

import TrendingAnimeSection from "../Components/TrendingAnimeSection";
import UpcomingAnimeSection from "../Components/UpcomingAnimeSection";
import FeaturedAnimeSection from "../Components/FeaturedAnimeSection";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [featuredSliderList, setFeaturedSliderList] = useState([]);
  const [trendingAnimeList, setTrendingAnimeList] = useState([]);
  const [airingAnimeList, setAiringAnimeList] = useState([]);
  const [mostPopularAnimeList, setMostPopularAnimeList] = useState([]);
  const [mostFavoriteAnimeList, setMostFavoriteAnimeList] = useState([]);
  const [recentEpisodesList, setRecentEpisodesList] = useState([]);
  const [upcomingAnimeList, setUpcomingAnime] = useState([]);
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
        "https://api.jikan.moe/v4/seasons/upcoming?sfw&limit=12", //Upcoming Anime
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
          upcomingAnimeListData,
          genresListData,
        ] = await fetchWithDelay(urls, 500);

        setFeaturedSliderList(featuredSliderListData);
        setTrendingAnimeList(trendingAnimeListData);
        setAiringAnimeList(airingAnimeListData);
        setMostPopularAnimeList(mostPopularAnimeListData);
        setMostFavoriteAnimeList(mostFavoriteAnimeListData);
        setRecentEpisodesList(recentEpisodesListData);
        setUpcomingAnime(upcomingAnimeListData);
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

        <FeaturedAnimeSection
          airingAnimeList={airingAnimeList}
          mostFavoriteAnimeList={mostFavoriteAnimeList}
          mostPopularAnimeList={mostPopularAnimeList}
          recentEpisodesList={recentEpisodesList}
        />

        <UpcomingAnimeSection data={upcomingAnimeList} genres={genresList} />
      </main>

      <Footer />
    </>
  );
}
