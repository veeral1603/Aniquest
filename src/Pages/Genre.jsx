import { useEffect, useState } from "react";
import ResultsSection from "../Components/ResultsSection";
import ShareSection from "../Components/ShareSection";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

function capitalizeWords(str) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

export default function Genre() {
  const [pageParam, setPageParam] = useSearchParams();
  const page = pageParam.get("page");
  console.log(page);

  const { genre, genreid } = useParams();

  const [moveisList, setMoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?genres=${genreid}&page=${currentPage}&limit=24`
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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
  }, [currentPage, genreid, navigate]);

  useEffect(() => {
    const newPage = page ? +page : 1;

    // Only update currentPage if it differs from the state
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
    }
  }, [genreid, page, currentPage]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">
        <ShareSection />

        <ResultsSection
          pageTitle={`${capitalizeWords(genre.split("-").join(" "))} Anime`}
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
