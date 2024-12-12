/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimeItemList from "./AnimeItemList";
import styles from "./CSS/ResultsContainer.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SearchLoader from "./SearchLoader";

export default function ResultsContainer({ data, loading }) {
  return (
    <div className={styles.resultsContainer}>
      {loading && <SearchLoader />}
      {data && (
        <>
          <ul className={styles.resultList}>
            {data.map((anime, i) => {
              {
                return <AnimeItemList data={anime} key={i} />;
              }
            })}
          </ul>

          <button className={styles.allResultsBtn}>
            View All Results <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
    </div>
  );
}
