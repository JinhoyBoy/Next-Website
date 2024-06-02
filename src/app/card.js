import styles from "./page.module.css";

export default function Card(props) {
  return (
    <div className={styles.card}>
      <img src={props.imgSrc} alt="project image" />
      <div className={styles.content}>
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}
