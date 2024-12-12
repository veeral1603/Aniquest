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

  const getUpdatedQuery = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber); // Update the page parameter
    return `?${searchParams.toString()}`;
  };

  const goToLastPage = function () {
    const updatedQuery = getUpdatedQuery(pagination.last_visible_page);
    setCurrentPage(pagination.last_visible_page);
    setLoading(true);
    navigate(updatedQuery);
  };

  const goToFirstPage = function () {
    const updatedQuery = getUpdatedQuery(1);
    setCurrentPage(1);
    setLoading(true);
    navigate(updatedQuery);
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
                const updatedQuery = getUpdatedQuery(currentPage - 2);
                navigate(updatedQuery);
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
                const updatedQuery = getUpdatedQuery(currentPage - 1);
                navigate(updatedQuery);
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
                const updatedQuery = getUpdatedQuery(currentPage + 1);
                navigate(updatedQuery);
                setCurrentPage((cur) => cur + 1);
                setLoading(true);
              }}
            >
              {currentPage + 1}
            </button>

            {pagination.last_visible_page - currentPage > 1 && (
              <button
                onClick={() => {
                  const updatedQuery = getUpdatedQuery(currentPage + 2);
                  navigate(updatedQuery);
                  setCurrentPage((cur) => cur + 2);
                  setLoading(true);
                }}
              >
                {currentPage + 2}
              </button>
            )}

            <button onClick={goToLastPage}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
