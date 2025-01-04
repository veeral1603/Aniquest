import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ResultsSection from "../Components/ResultsSection";
import ShareSection from "../Components/ShareSection";
import FeaturedSlider from "../Components/FeaturedSlider";

const CACHE_KEY = "watchlist";

//takes an object as argument
export const saveToWatchList = (data) => {
  if (localStorage.getItem(CACHE_KEY)) {
    const watchList = JSON.parse(localStorage.getItem(CACHE_KEY));
    watchList.push(data);

    localStorage.setItem(CACHE_KEY, JSON.stringify(watchList));
  } else {
    localStorage.setItem(CACHE_KEY, JSON.stringify([data]));
  }
};

export const getWatchList = () => {
  if (!localStorage.getItem(CACHE_KEY)) return null;

  return JSON.parse(localStorage.getItem(CACHE_KEY));
};

export const checkIfExist = (obj) => {
  const watchList = JSON.parse(localStorage.getItem(CACHE_KEY));

  if (!watchList) return false;

  return watchList.some((arrObj) => arrObj.mal_id === obj.mal_id);
};

export const deleteFromWatchList = (obj) => {
  const newArr = getWatchList().filter(
    (arrObj) => arrObj.mal_id !== obj.mal_id
  );

  localStorage.setItem(CACHE_KEY, JSON.stringify(newArr));
};

export default function WatchList() {
  const [loading, setLoading] = useState(true);
  const [featuredSliderList, setFeaturedSliderList] = useState([]);

  const [watchListData, setWatchListData] = useState(
    JSON.parse(localStorage.getItem(CACHE_KEY))
      ? JSON.parse(localStorage.getItem(CACHE_KEY))
      : []
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // Page Title
  useEffect(() => {
    document.title = `Watch List - AniQuest`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true&limit=10&page=1"
        );

        const data = await res.json();

        setFeaturedSliderList(data.data);
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
      <div className="content-wrapper">
        <ShareSection />

        <ResultsSection
          isPagination={false}
          pageTitle={"Your Watch List"}
          data={watchListData}
          setWatchListData={setWatchListData}
        />
      </div>
      <Footer />
    </>
  );
}
