import styles from "./CSS/Footer.module.css";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="container">
      <div className={`${styles.footerContainer}`}>
        <Link to={`/`}>
          <img src={Logo} loading="lazy" />
        </Link>

        <div className={styles.footerText}>
          <p>
            A React.js project by <span>Veeral Narang</span>
          </p>
          <div className={styles.socialIcons}>
            <a
              href="https://www.linkedin.com/in/veeral-narang/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} className={styles.linkedIn} />
            </a>
            <a href="https://github.com/veeral1603" target="_blank">
              <FontAwesomeIcon icon={faGithub} className={styles.gitHub} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
