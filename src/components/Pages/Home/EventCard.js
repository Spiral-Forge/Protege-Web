import styles from "../../../styles/EventCard.module.css";

export default function EventCard({ event }) {

  const eDate = event.dateTime.toDate();
  let mins = eDate.getMinutes()
  if(mins<10)
      mins = '0' + mins;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>
          <span>{ eDate.toLocaleString('default', { month: 'short' })+ " "+ eDate.getDate() +", "+eDate.getFullYear() }</span> | {" "}
          <span>
            { eDate.getHours()+":"+mins }
          </span>
        </p>
        <p>{event.venue}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={event.imageUrl} alt="" />
        </div>
        <div className={styles.body}>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
        </div>
        <div className={styles.cta}>
          <a target="_blank" rel="noreferrer" href={event.registrationLink}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
