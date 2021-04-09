import styles from "./Introduction.module.css";

function Introduction() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <section>
          Niffler is a fantastic beast which can&apos;t resist shiny things.
        </section>
        <section>
          Follow him on his adventure and help him collect as many <br /> golden
          and shiny things as you can but avoid everything else.
        </section>
      </div>
      <h2 className={styles.subheading}>Game control</h2>
      <section className={styles.control}>
        <p>Press space ⎵ to start the game.</p>
        <p>Control Niffler with up and down keys. ↑↓</p>
      </section>
    </div>
  );
}

export default Introduction;
