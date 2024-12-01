import { useEffect, useState, useRef } from "react";
import "./CSS/Home.css";
import FeaturedSlider from "../Components/FeaturedSlider";
import PrimaryHeading from "../Components/PrimaryHeading";
import AnimeItemBig from "../Components/AnimeItemBIg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Navigation } from "swiper/modules";
import ShareSection from "../Components/ShareSection";

export default function Home() {
  const [trendingAnimeList, setTrendingAnimeList] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=16&page=2`
        );
        const data = await res.json();
        setTrendingAnimeList(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrendingAnime();
  }, []);

  return (
    <>
      <FeaturedSlider />
      <main>
        <section className="container trending-anime-container">
          <PrimaryHeading>Trending</PrimaryHeading>

          <div className="trending-anime">
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
              {trendingAnimeList.map((anime, i) => {
                {
                  return (
                    <SwiperSlide>
                      <AnimeItemBig key={i} data={anime} rank={i + 1} />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>

            <div className="swiper-buttons">
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

        <ShareSection />

        <section className="contaier featured-anime"></section>
      </main>
    </>
  );
}
