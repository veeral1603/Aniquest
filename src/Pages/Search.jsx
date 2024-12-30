/* eslint-disable react/prop-types */

import { useNavigate, useSearchParams } from "react-router-dom";
import ShareSection from "../Components/ShareSection";
import Loader from "../Components/Loader";
import { useState, useEffect, useRef } from "react";
import ResultsSection from "../Components/ResultsSection";
import Footer from "../Components/Footer";

export default function Search() {
  const [searchParam, setSearchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  let prevKeyword = useRef(keyword);

  const page = searchParam.get("page");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [resultList, setSearchResultList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [totalAnime, setTotalAnime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (prevKeyword.current != keyword) {
        setCurrentPage(1);
        prevKeyword.current = keyword;
        return;
      }

      let url = keyword
        ? `https://api.jikan.moe/v4/anime?q=${keyword}&sfw=true&limit=24&filter=bypopularity&page=${currentPage}`
        : `https://api.jikan.moe/v4/top/anime?&sfw=true&limit=24&page=${currentPage}`;

      try {
        const res = await fetch(url);

        const data = await res.json();

        if (data.data.length == 0) {
          navigate("/page-not-found");
        }

        setSearchResultList(data.data);
        setPagination(data.pagination);
        setTotalAnime(data.pagination.items.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, navigate, keyword]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">
        <ShareSection />
        <ResultsSection
          pageTitle={
            keyword
              ? `Search Results: ${keyword}`
              : `Search from ${totalAnime} Anime`
          }
          data={resultList}
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
