import styles from "../../styles/Event.module.css";
import EventCard from "./EventCard";

export default function Event() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.heading}>
        <h1>Events</h1>
      </div> */}
      <div className={styles.content}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}
