import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import PageNotFound from "./Pages/PageNotFound";
import WatchList from "./Pages/WatchList";
import Navbar from "./Components/Navbar";
import Anime from "./Pages/Anime";
import Ova from "./Pages/Ova";
import Ona from "./Pages/Ona";
import Upcoming from "./Pages/Upcoming";
import Genre from "./Pages/Genre";
import Search from "./Pages/Search";
import Character from "./Pages/Character";
import TopAiring from "./Pages/TopAiring";
import MostPopular from "./Pages/MostPopular";
import MostFavorite from "./Pages/MostFavorite";
import RecentEpisodes from "./Pages/RecentEpisodes";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="tv-shows" element={<TvShows />} />

          <Route path="movies" element={<Movies />} />

          <Route path="watch-list" element={<WatchList />} />
          <Route path="anime" element={<Anime />} />
          <Route path="anime/:animeId" element={<Anime />} />

          <Route path="character" element={<Character />} />
          <Route path="character/:characterId" element={<Character />} />

          <Route path="ova" element={<Ova />} />
          <Route path="ona" element={<Ona />} />
          <Route path="upcoming" element={<Upcoming />} />

          <Route path="genre" element={<Genre />} />
          <Route path="genre/:genre/:genreid" element={<Genre />} />

          <Route path="top-airing" element={<TopAiring />} />
          <Route path="most-popular" element={<MostPopular />} />
          <Route path="most-favorite" element={<MostFavorite />} />
          <Route path="recent-episodes" element={<RecentEpisodes />} />

          <Route path="search" element={<Search />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
