import { useParams } from "react-router-dom";

export default function Anime() {
  const { anime } = useParams();
  const animeId = anime.split("-")[anime.split("-").length - 1];

  return (
    <>
      <div className="content-wrapper">
        <div>Anime</div>
        <div>{animeId}</div>
      </div>
    </>
  );
}
