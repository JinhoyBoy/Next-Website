//Navbar Komponente für alle Seiten
import Link from "next/link";
import styles from "./page.module.css";

export default function Navbar() {
  return (
      <nav className={styles.navbar}>
        <Link href="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
        <p>3084111</p>
      </nav>
  );
}