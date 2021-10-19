import styles from "../../../styles/EventCard.module.css";

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>
          <span>{event.Date.toDate().toDateString()}</span> | {" "}
          <span>
            {new Date(event.Time.seconds * 1000).toLocaleTimeString()}
          </span>
        </p>
        <p>{event.Venue}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={event.ImageUrl} alt="" />
        </div>
        <div className={styles.body}>
          <h1>{event.Name}</h1>
          <p>{event.Description}</p>
        </div>
        <div className={styles.cta}>
          <a target="_blank" rel="noreferrer" href={event.Link}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
