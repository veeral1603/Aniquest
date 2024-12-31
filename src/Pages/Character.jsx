import { useState } from "react";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";

export default function Character() {
  const [loading, setLoading] = useState(false);
  const { characterId } = useParams();

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="content-wrapper">Character {characterId}</div>
      <Footer />
    </>
  );
}
