import styles from "./page.module.css";

export default function Navbar() {
  return (
      <nav className={styles.navbar}>
        <img src="/logo.svg" alt="Logo" />
        <p>3084111</p>
      </nav>
  );
}