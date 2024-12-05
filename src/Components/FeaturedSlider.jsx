/* eslint-disable react/prop-types */

import styles from "./CSS/FeaturedSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import { faChevronRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { Link } from "react-router-dom";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function FeaturedSlider({ data }) {
  return (
    <div className={`container`}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        loop={true}
      >
        {data.map((anime, index) => {
          {
            const {
              mal_id,
              title_english,
              synopsis,
              images: {
                webp: { large_image_url },
              },
              trailer: {
                url,
                images: { maximum_image_url },
              },
              aired: {
                prop: {
                  from: { day, month, year },
                },
              },
              duration,
              type,
            } = anime;

            return (
              <SwiperSlide key={index}>
                <div className={styles.slide}>
                  <div
                    className={styles.backgroundImage}
                    style={{
                      backgroundImage: `url(${
                        maximum_image_url ? maximum_image_url : large_image_url
                      }`,
                    }}
                  ></div>

                  <div
                    className={styles.coverBackgroundImage}
                    style={{
                      backgroundImage: `url(${large_image_url}`,
                    }}
                  ></div>

                  <div className={styles.contentContainer}>
                    <div className={styles.title}>
                      <h1>{title_english}</h1>
                      <p>{synopsis.substring(0, 300)}...</p>
                    </div>

                    <div className={styles.details}>
                      <div className={styles.detailItem}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                        <span>{type}</span>
                      </div>

                      <div className={styles.detailItem}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{`${duration.substring(0, 2)} Min`}</span>
                      </div>

                      <div className={styles.detailItem}>
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{`${day} ${
                          monthNames[month - 1]
                        }, ${year}`}</span>
                      </div>
                    </div>

                    <div className={styles.buttons}>
                      <a
                        href={url ? url : "/"}
                        target="_blank"
                        className={styles.trailerBtn}
                        disabled="disabled"
                      >
                        <FontAwesomeIcon icon={faCirclePlay} />
                        Trailer
                      </a>
                      <Link
                        to={`/anime/${mal_id}`}
                        className={styles.detailBtn}
                      >
                        Detail <FontAwesomeIcon icon={faChevronRight} />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
}
