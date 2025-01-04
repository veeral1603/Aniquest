import { useEffect, useState } from "react";
import ResultsSection from "../Components/ResultsSection";
import ShareSection from "../Components/ShareSection";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import { useSearchParams } from "react-router-dom";

export default function TvShows() {
  const [pageParam, setPageParam] = useSearchParams();
  const page = pageParam.get("page");

  const [moveisList, setMoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [currentPage]);

  // Page Title
  useEffect(() => {
    document.title = `TV Shows - AniQuest`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?sfw=true&type=tv&limit=24&filter=favorite&page=${currentPage}`
        );

        const data = await res.json();

        setMoviesList(data.data);
        setPagination(data.pagination);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">
        <ShareSection />

        <ResultsSection
          pageTitle={"TV Shows Anime"}
          data={moveisList}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setLoading={setLoading}
        />
      </div>

      <Footer />
    </>
  );
}
