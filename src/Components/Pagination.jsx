/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/Pagination.module.css";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination({
  pagination,
  currentPage,
  setCurrentPage,
  setLoading,
}) {
  const nextPage = function () {
    if (currentPage == pagination.last_visible_page) return;

    setCurrentPage(currentPage + 1);
    setLoading(true);
  };

  const prevPage = function () {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
    setLoading(true);
  };

  const goToLastPage = function () {
    setCurrentPage(pagination.last_visible_page);
    setLoading(true);
  };

  const goToFirstPage = function () {
    setCurrentPage(1);
    setLoading(true);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.btnContainer}>
        {currentPage > 1 && (
          <>
            <button onClick={goToFirstPage}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </>
        )}

        {currentPage > 2 && (
          <>
            <button
              onClick={() => {
                setCurrentPage((cur) => cur - 2);
                setLoading(true);
              }}
            >
              {currentPage - 2}
            </button>
          </>
        )}

        {currentPage > 1 && (
          <>
            <button
              onClick={() => {
                setCurrentPage((cur) => cur - 1);
                setLoading(true);
              }}
            >
              {currentPage - 1}
            </button>
          </>
        )}

        <button className={styles.active}>{currentPage}</button>

        {pagination.has_next_page && (
          <>
            <button
              onClick={() => {
                setCurrentPage((cur) => cur + 1);
                setLoading(true);
              }}
            >
              {currentPage + 1}
            </button>

            <button
              onClick={() => {
                setCurrentPage((cur) => cur + 2);
                setLoading(true);
              }}
            >
              {currentPage + 2}
            </button>

            <button onClick={goToLastPage}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
