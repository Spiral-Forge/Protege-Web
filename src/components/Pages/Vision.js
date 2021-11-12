import styles from "../../styles/Vision.module.css";
import { team } from "./staticPagesData";
export default function Vision() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Our Vision</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.pees}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
            praesentium autem dolorum commodi delectus voluptatem dicta,
            quibusdam officiis hic sapiente, mollitia quaerat dolorem
            voluptatum. Rederit laborum dolor voluptate voluptatem!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
            praesentium autem dolorum commodi delectus voluptatem dicta,
            quibusdam officiiem dolorum commodi delectus voluptatem dicta,
            quibusdam ofderit laborum dolor voluptate voluptatem!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
            praesentium autem dolorum commodi delectus voluptatem dicta,
            quibusdam officierit laborum dolor voluptate voluptatem!
          </p>
        </div>
        <div className={styles.cards}>
          {team.map((mem) => {
            return (
              <div className={styles.card}>
                <div className={styles.img}>
                  <img
                    src="https://source.unsplash.com/random/400x250"
                    alt=""
                  />
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
