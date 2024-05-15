import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className={styles.navbar}>
        <p>3084111</p>
        <p>DHBW-Stuttgart</p>
      </nav>
      <section className={styles.hero}>
        <h1>Please give this website a good rating</h1>
        <p>I put a lot of Effort into it.</p>
      </section>
      <section className={styles.techSection}>
        <div className={styles.techBlock}>
          <h2>Technologies</h2>
          <ul>
            <li>React</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>
      </section>
      <section className={styles.projekte}>
      <div className={styles.container}>
      <Link href="/weather">
        <div className={styles.card}>
          <img src="/weather.png" alt="Projekt 1" />
          <div className={styles.content}>
            <h3>Wetter-Daten</h3>
            <p>Beschreibung des Projekts 1</p>
          </div>
        </div>
      </Link>
      <Link href="/stocks">
        <div className={styles.card}>
          <div className={styles.content}>
            <img src="/graph.png" alt="Projekt 3" />
            <h3>Akiten-Daten</h3>
            <p>Beschreibung des Projekts 2</p>
          </div>
        </div>
      </Link>
      <Link href="/">
        <div className={styles.card}>
          <img src="/train.png" alt="Projekt 3" />
          <div className={styles.content}>
            <h3>Deutsche Bahn</h3>
            <p>Beschreibung des Projekts 3</p>
          </div>
        </div>
        </Link>
      </div>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2021</p>
      </footer>
    </div>
  );
}
