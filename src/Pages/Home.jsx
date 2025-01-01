import { useEffect, useState } from "react";
import "./CSS/Home.css";
import FeaturedSlider from "../Components/FeaturedSlider";
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
  const [upcomingAnimeList, setUpcomingAnimeList] = useState([]);

  const CACHE_KEY = "animeDataCache";

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

  const saveToCache = (data) => {
    const cache = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  };

  const loadFromCache = () => {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const { data, timestamp } = JSON.parse(cache);
    const cacheDuration = 1000 * 60 * 60 * 24 * 1; // Cache valid for 5 days

    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }

    // Cache expired
    localStorage.removeItem(CACHE_KEY);
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const cachedData = loadFromCache();

      if (cachedData && cachedData[0].length > 0) {
        // Use cached data
        setFeaturedSliderList(cachedData[0]);
        setTrendingAnimeList(cachedData[1]);
        setAiringAnimeList(cachedData[2]);
        setMostPopularAnimeList(cachedData[3]);
        setMostFavoriteAnimeList(cachedData[4]);
        setRecentEpisodesList(cachedData[5]);
        setUpcomingAnimeList(cachedData[6]);
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        return;
      }

      // Fetch fresh data

      const urls = [
        "https://api.jikan.moe/v4/top/anime?filter=favorite&sfw=true&limit=10&page=2", //Featued Slider
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=16&page=2", //Trending Anime
        "https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true&limit=5", //Top Airing
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=5", //Most Popular
        "https://api.jikan.moe/v4/top/anime?filter=favorite&sfw=true&limit=5", //Most Favorite
        "https://api.jikan.moe/v4/seasons/now?sfw&limit=5", //Latest Episodes
        "https://api.jikan.moe/v4/seasons/upcoming?sfw&limit=12", //Upcoming Anime
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
        ] = await fetchWithDelay(urls, 500);

        setFeaturedSliderList(featuredSliderListData);
        setTrendingAnimeList(trendingAnimeListData);
        setAiringAnimeList(airingAnimeListData);
        setMostPopularAnimeList(mostPopularAnimeListData);
        setMostFavoriteAnimeList(mostFavoriteAnimeListData);
        setRecentEpisodesList(recentEpisodesListData);
        setUpcomingAnimeList(upcomingAnimeListData);

        // Saving in cahce

        const dataToSave = [
          featuredSliderListData,
          trendingAnimeListData,
          airingAnimeListData,
          mostPopularAnimeListData,
          mostFavoriteAnimeListData,
          recentEpisodesListData,
          upcomingAnimeListData,
        ];
        saveToCache(dataToSave);
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

        <UpcomingAnimeSection data={upcomingAnimeList} />
      </main>

      <Footer />
    </>
  );
}
