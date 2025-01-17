import { Link } from "react-router-dom";
import PageNotFoundPic from "../assets/PageNotFound.png";
import PrimaryButton from "../Components/PrimaryButton";
import "./CSS/PageNotFound.css";
import { useEffect } from "react";

export default function PageNotFound() {
  // Page Title
  useEffect(() => {
    document.title = `Page Not Found`;
  }, []);

  return (
    <>
      <main>
        <div className="content-wrapper">
          <div className="page-not-found">
            <img src={PageNotFoundPic} />
            <h1>Page Not Found!</h1>
            <Link to={"/"}>
              <PrimaryButton padding="8px 16px">Home Page</PrimaryButton>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
