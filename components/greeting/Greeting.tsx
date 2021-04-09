import styles from "./Greeting.module.css";

function Greeting() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to GoldNiffler</h1>
      <h2 className={styles.subheading}>A Niffler Fangame</h2>
    </div>
  );
}

export default Greeting;
