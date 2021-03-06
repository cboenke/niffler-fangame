import Button from "../components/button/Button";
import Introduction from "../components/introduction/Introduction";
import styles from "../styles/HowToPlay.module.css";

export default function HowToPlay() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src="/howToPlay.png" className={styles.img} />
        <Introduction />
        <div className={styles.play}>
          <Button imgSrc="/playSymbol.svg" href="/game" />
        </div>
      </main>
    </div>
  );
}
