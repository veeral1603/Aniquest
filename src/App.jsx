import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import PageNotFound from "./Pages/PageNotFound";
import WatchList from "./Pages/WatchList";
import Navbar from "./Components/Navbar";
import Anime from "./Pages/Anime";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="tv-shows" element={<TvShows />} />
          <Route path="tv-shows/page=:page" element={<TvShows />} />

          <Route path="movies" element={<Movies />} />
          <Route path="movies/page=:page" element={<Movies />} />

          <Route path="watch-list" element={<WatchList />} />
          <Route path="anime" element={<Anime />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
