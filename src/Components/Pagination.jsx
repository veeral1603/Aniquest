/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CSS/Pagination.module.css";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Pagination({
  pagination,
  currentPage,
  setCurrentPage,
  setLoading,
}) {
  const navigate = useNavigate();

  const goToLastPage = function () {
    setCurrentPage(pagination.last_visible_page);
    setLoading(true);
    navigate(`?page=${pagination.last_visible_page}`);
  };

  const goToFirstPage = function () {
    setCurrentPage(1);
    setLoading(true);
    navigate(`?page=${1}`);
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
                navigate(`?page=${currentPage - 2}`);
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
                navigate(`?page=${currentPage - 1}`);
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
                navigate(`?page=${currentPage + 1}`);
                setCurrentPage((cur) => cur + 1);
                setLoading(true);
              }}
            >
              {currentPage + 1}
            </button>

            <button
              onClick={() => {
                navigate(`?page=${currentPage + 2}`);
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
