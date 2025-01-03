import { useEffect, useState } from "react";
import ResultsSection from "../Components/ResultsSection";
import ShareSection from "../Components/ShareSection";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function RecentEpisodes() {
  const [pageParam, setPageParam] = useSearchParams();
  const page = pageParam.get("page");

  const [moveisList, setMoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/seasons/now?sfw&limit=24&page=${currentPage}`
        );

        const data = await res.json();

        if (data.data.length == 0) {
          navigate("/page-not-found");
        }

        setMoviesList(data.data);
        setPagination(data.pagination);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [currentPage]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">
        <ShareSection />

        <ResultsSection
          pageTitle={"Recent Episodes"}
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
