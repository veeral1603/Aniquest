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
    window.scrollTo({
      top: 0,
    });
  }, [currentPage]);

  // Page Title
  useEffect(() => {
    document.title = keyword
      ? `Search Results: ${keyword}`
      : `Search Anime - AniQuest`;
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (prevKeyword.current != keyword) {
        setCurrentPage(1);
        prevKeyword.current = keyword;
      }

      let url = keyword
        ? `https://api.jikan.moe/v4/anime?q=${keyword}&sfw=true&limit=24&filter=bypopularity&page=${currentPage}`
        : `https://api.jikan.moe/v4/top/anime?&sfw=true&limit=24&page=${currentPage}`;

      try {
        const res = await fetch(url);

        const data = await res.json();

        if (data.data.length == 0) {
          setCurrentPage(1);
          return;
        }

        setSearchResultList(data.data);
        setPagination(data.pagination);
        setTotalAnime(data.pagination.items.total);

        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        //not using fially to set loading to false because it will exrcute regardless of returning the try block which was causing page shifts
      }
    };
    setLoading(true);
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
