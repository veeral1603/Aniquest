import styles from "./CSS/CharactersSection.module.css";
import PrimaryHeading from "./PrimaryHeading";

export default function CharactersSection() {
  return (
    <section className={`${styles.charactersSection} container`}>
      <PrimaryHeading moreBtn={false}>Characters</PrimaryHeading>
    </section>
  );
}
