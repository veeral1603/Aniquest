import { useParams } from "react-router-dom";
import AnimeHeaderSection from "../Components/AnimeHeaderSection";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ShareSection from "../Components/ShareSection";

import CharactersSection from "../Components/CharactersSection";

export default function Anime() {
  const { animeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [animeDetails, setAnimeDetails] = useState([]);
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [charactersList, setCharactersList] = useState([]);

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
        `https://api.jikan.moe/v4/anime/${animeId}/full`,
        `https://api.jikan.moe/v4/anime/${animeId}/characters`,
      ];

      try {
        const [animeDetailsData, charactersListData] = await fetchWithDelay(
          urls,
          500
        );

        setAnimeDetails(animeDetailsData);
        setCharactersList(charactersListData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [animeId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">
        <AnimeHeaderSection data={animeDetails} />
        <ShareSection />

        <CharactersSection data={charactersList} />
      </div>

      <Footer />
    </>
  );
}
