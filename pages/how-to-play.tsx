import Head from "next/head";
import Button from "../components/button/Button";
import Introduction from "../components/introduction/Introduction";
import styles from "../styles/HowToPlay.module.css";

const play = {
  imgSrc: "/playSymbol.svg",
  href: "#",
};

export default function HowToPlay() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Placeholder for game name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src="/howToPlay.png" className={styles.img} />
        <Introduction />
        <div className={styles.button}>
          <Button {...play} />
        </div>
      </main>
    </div>
  );
}
