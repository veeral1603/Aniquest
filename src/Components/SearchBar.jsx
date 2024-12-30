/* eslint-disable react/prop-types */

import styles from "./CSS/SearchBar.module.css";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SearchLoader from "./SearchLoader";
import AnimeItemList from "./AnimeItemList";

export default function SearchBar({
  width,
  filterBtn = false,
  className,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
}) {
  const searchBarStyles = { width: width };

  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const [searchResultList, setSearchResultList] = useState(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (query.length <= 2) {
      setSearchResultList(null);
      setSearchLoading(true);
      setIsResultOpen(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const searchData = async () => {
      try {
        setIsResultOpen(true);
        setSearchLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}&sfw=true&limit=3&filter=bypopularity`,
          { signal }
        );
        const data = await response.json();

        if (response.ok) {
          setSearchResultList(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch anime data");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      } finally {
        setSearchLoading(false);
      }
    };
    setSearchResultList(null);
    setTimeout(() => {
      searchData();
    }, 500);

    return () => controller.abort();
  }, [query, setSearchResultList]);

  useEffect(() => {
    const handleClickOut = (e) => {
      console.log(e.target);
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsResultOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, []);

  return (
    <div
      className={`${styles.searchContainer} ${className} ${
        isMobileSearchOpen ? styles.active : ""
      }`}
      ref={inputRef}
    >
      <div className={`${styles.searchBarContainer}`}>
        <div className={styles.searchBar} style={width ? searchBarStyles : {}}>
          <form>
            <input
              type="text"
              placeholder="Search Anime"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => (query.length > 2 ? setIsResultOpen(true) : "")}
            />
            <div className={styles.searchBarBtns}>
              {filterBtn && (
                <Link to={"/search"}>
                  <button className={styles.filterBtn}>
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </Link>
              )}
              <PrimaryButton
                radius="4px"
                padding="8px"
                onClick={(e) => {
                  e.preventDefault();
                  if (query.length == 0) return;
                  if (searchResultList && searchResultList.length === 0) return;

                  setIsMobileSearchOpen(false);
                  setIsResultOpen(false);
                  navigate(`search?keyword=${query}&page=1`);
                  setQuery("");
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>

      {/* Results Container  */}
      <div
        className={`${styles.resultsContainer} ${
          isResultOpen ? styles.active : ""
        }`}
        ref={resultsRef}
      >
        {searchLoading && <SearchLoader />}
        {searchResultList && searchResultList.length === 0 ? (
          <div className={styles.noResults}>
            <h3>No Results!</h3>
          </div>
        ) : (
          ""
        )}
        {searchResultList && searchResultList.length > 0 && (
          <>
            <ul className={styles.resultList}>
              {searchResultList.map((anime, i) => {
                {
                  return (
                    <AnimeItemList
                      data={anime}
                      key={i}
                      setIsResultOpen={setIsResultOpen}
                      setQuery={setQuery}
                      setIsMobileSearchOpen={setIsMobileSearchOpen}
                    />
                  );
                }
              })}
            </ul>
            <Link
              to={`/search?keyword=${query}`}
              onClick={() => {
                setIsResultOpen(false);
                setIsMobileSearchOpen(false);
                setQuery("");
              }}
            >
              <button className={styles.allResultsBtn}>
                View All Results <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
