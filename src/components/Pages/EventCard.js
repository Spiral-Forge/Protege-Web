import styles from "../../styles/EventCard.module.css";

export default function EventCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>
          <span>Oct 9, 2021</span> | <span>5:00 PM</span>
        </p>
        <p>Online</p>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src="https://source.unsplash.com/random/600x400" alt="" />
        </div>
        <div className={styles.body}>
          <h1>Title of Event</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsum
            libero obcaecati, laudantium eveniet laboriosam aliquam? Itaque
            similique nemo nulla incidunt repudiandae distinctio, suscipit
            labore deleniti omnis sedeleniti omnis sequi sed reprehenderit.
          </p>
        </div>
        <div className={styles.cta}>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
