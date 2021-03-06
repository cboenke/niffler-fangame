import Button from "../components/button/Button";
import Greeting from "../components/greeting/Greeting";
import styles from "../styles/Welcome.module.css";

export default function Welcome() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Greeting />
        <img src="/pileOfGold.svg" className={styles.img} />
        <div className={styles.buttons}>
          <Button imgSrc="/iSymbol.svg" href="/how-to-play" />
          <Button imgSrc="/playSymbol.svg" href="/game" />
        </div>
      </main>
    </div>
  );
}
