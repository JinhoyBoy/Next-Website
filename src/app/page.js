import Footer from "./footer";
import Navbar from "./navbar";
import Card from "./card";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <h1>This is the website for the Web-Engineering project</h1>
        <p>Please give this a good rating.</p>
      </section>
      <section className={styles.projekte}>
      <div className={styles.container}>
      <Link href="/weather">
        <Card imgSrc="/weather.png" title="Weather-Data" desc="Beschreibung des Projektes 1"/>
      </Link>
      <Link href="/stocks">
        <Card imgSrc="/graph.png" title="Stock-Data" desc="Beschreibung des Projektes 2"/>
      </Link>
      <Link href="/">
        <Card imgSrc="/train.png" title="Deutsche Bahn" desc="Beschreibung des Projektes 3"/>
      </Link>
      </div>
      </section>
      <section>
        <div className={styles.techBlock}>
          <h2>Technologies for this Website.</h2>
          <div className={styles.techList}>
            <a href="https://nextjs.org/" target="_blank" >React</a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" >HTML</a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS?retiredLocale=de" target="_blank" >CSS</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
