import styles from "../../styles/Vision.module.css";
import { aboutSoc, team } from "./staticPagesData";
export default function Vision() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Our Vision</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.pees}>
          <p>{aboutSoc}</p>
        </div>
        <div className={styles.cards}>
          {team.map((mem) => {
            return (
              <div className={styles.card}>
                <div className={styles.img}>
                  <img src={"./assets/founders/" + mem.image} alt="" />
                </div>
                <div className={styles.desc}>
                  <h3>{mem.name}</h3>
                  <a href={mem.linkedIn} target="_blank" rel="noreferrer">
                    Connect
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
