import Button from "../components/button/Button";
import LevelCompleted from "../components/levelCompleted/LevelCompleted";
import styles from "../styles/GameFinished.module.css";

export default function FinishedGame() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <LevelCompleted />
        <img src="/pileOfGold.svg" className={styles.img} />
        <div className={styles.play}>
          <Button imgSrc="/playSymbol.svg" href="/game" />
        </div>
      </main>
    </div>
  );
}
