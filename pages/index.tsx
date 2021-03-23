import Head from "next/head";
import Button from "../components/button/Button";
import Greeting from "../components/greeting/Greeting";
import styles from "../styles/Welcome.module.css";

const intro = {
  imgSrc: "/iSymbol.svg",
  href: "#",
};

const play = {
  imgSrc: "/playSymbol.svg",
  href: "#",
};

export default function Welcome() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Placeholder for game name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Greeting />
        <img src="/pileOfGold.svg" className={styles.img} />
        <div className={styles.buttons}>
          <Button {...intro} />
          <Button {...play} />
        </div>
      </main>
    </div>
  );
}
