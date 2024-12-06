import { useEffect, useState } from "react";
import ResultsSection from "../Components/ResultsSection";
import ShareSection from "../Components/ShareSection";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";

export default function Movies() {
  const [moveisList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?sfw=true&type=movie&limit=24&filter=bypopularity`
        );
        const data = await res.json();

        setMoviesList(data.data);
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
      <div className="content-wrapper">
        <ShareSection />

        <ResultsSection pageTitle={"Movie Anime"} data={moveisList} />
      </div>

      <Footer />
    </>
  );
}
