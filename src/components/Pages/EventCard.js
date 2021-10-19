import styles from "../../styles/EventCard.module.css";

export default function EventCard({event}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>
          <span>{event.date}</span> | <span>{event.time}</span>
        </p>
        <p>Online</p>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={event.url} alt="" />
        </div>
        <div className={styles.body}>
          <h1>{event.name}</h1>
          <p>
           {event.description}
          </p>
        </div>
        <div className={styles.cta}>
          <a target='_blank' rel='noreferrer' href={event.link}>Register</a>
        </div>
      </div>
    </div>
  );
}
