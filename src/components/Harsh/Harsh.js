import styles from "../../styles/Harsh.module.css";
import Resource from "./Resource";
import VerticalNav from "./VerticalNav";

export default function Harsh() {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <VerticalNav />
        <Resource />
      </div>
    </div>
  );
}
