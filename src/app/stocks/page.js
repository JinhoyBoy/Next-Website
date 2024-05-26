import styles from "../page.module.css";
import Link from 'next/link';

export default function Stocks() {
    return (
    <>
        <nav className={styles.navbar}>
        <img src="/logo.svg" alt="Logo" />
        <p>3084111</p>
      </nav>
      <div className={styles.hero}>
      <h1>Stocks!</h1>
      <br />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </div>
      <footer className={styles.footer}>
        <p>DHBW Web-Engineering TINF22IN</p> <br />
        <p>&copy; 2024</p>
      </footer>
    </>
)
}