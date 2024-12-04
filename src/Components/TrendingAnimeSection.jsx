/* eslint-disable react/prop-types */

import PrimaryHeading from "./PrimaryHeading";
import AnimeItemBig from "./AnimeItemBig";
import styles from "./CSS/TrendingAnimeSection.module.css";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function TrendingAnimeSection({ data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="container trending-anime-section">
      <PrimaryHeading>Trending</PrimaryHeading>

      <div className={styles.TrendingAnime}>
        <Swiper
          slidesPerView={2.25}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="trending-swiper"
        >
          {data.map((anime, i) => {
            {
              return (
                <SwiperSlide key={anime.title_english}>
                  <AnimeItemBig data={anime} rank={i + 1} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>

        <div className={styles.SwiperButtons}>
          <button className="swiper-next" ref={nextRef}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "20px" }}
            />
          </button>
          <button className="swiper-prev" ref={prevRef}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ fontSize: "20px" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
