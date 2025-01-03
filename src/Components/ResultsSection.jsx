/* eslint-disable react/prop-types */

import AnimeItemSmall from "./AnimeItemSmall";
import styles from "./CSS/ResultsSection.module.css";
import GenresContainer from "./GenresContainer";
import Pagination from "./Pagination";
import PrimaryHeading from "./PrimaryHeading";
import SidebarAdArea from "./SidebarAdArea";

export default function ResultsSection({
  pageTitle,
  data,
  pagination,
  currentPage,
  setCurrentPage,
  setLoading,
  isPagination = true,
  setWatchListData,
}) {
  return (
    <section className={`container ${styles.resultsSection}`}>
      <div className={styles.resultsContainerWrapper}>
        <PrimaryHeading>{pageTitle}</PrimaryHeading>

        <div className={styles.resultsContainer}>
          {data.length == 0 ? (
            <p className={styles.emptyList}>Your Watch List is Empty!</p>
          ) : (
            ""
          )}
          {data.map((anime, i) => {
            {
              return (
                <AnimeItemSmall
                  data={anime}
                  key={i}
                  animeType="m"
                  setWatchListData={setWatchListData}
                />
              );
            }
          })}
        </div>

        {isPagination && (
          <Pagination
            pagination={pagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLoading={setLoading}
          />
        )}
      </div>

      <div className={styles.sidebar}>
        <SidebarAdArea />

        <div className={styles.genre}>
          <PrimaryHeading>Genres</PrimaryHeading>
          <GenresContainer />
        </div>
      </div>
    </section>
  );
}
