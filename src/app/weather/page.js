import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Link from 'next/link';

export default function Weather() {
  return (
    <>
      <Navbar />
      <div className={styles.hero}>
        <h1>Weather!</h1>
        <br />
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </div>
      <Footer/>
    </>
  );
}