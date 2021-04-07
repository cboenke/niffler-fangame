import styles from "./LevelCompleted.module.css";

function LevelCompleted() {
  const displayedScore = JSON.parse(localStorage.getItem("score"));
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Level completed!</h1>
      <p className={styles.score}>
        <span className={styles.leftSide}>Score: </span>
        <span>{displayedScore}</span>
      </p>
    </div>
  );
}

export default LevelCompleted;
