import { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/Deadlines.module.css";
const Deadlines = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Deadlines</h1>
      </div>
      <Calendar />
    </div>
  );
};

export default Deadlines;

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(parseInt(today.getMonth()));
  const [currentYear, setCurrentYear] = useState(parseInt(today.getFullYear()));

  return (
    <>
      <div className={styles.calendarContainer}>
        <div className={styles.monthsContainer}>
          <span
            onClick={() => {
              setCurrentMonth((currentMonth - 1 + 12) % 12);
              console.log((currentMonth - 1 + 12) % 12);
            }}
          >
            {months[(currentMonth - 1 + 12) % 12]}
          </span>
          <span className={styles.currentDate}>
            <span>{months[currentMonth]} </span>
            <span> {currentYear}</span>
          </span>
          <span
            onClick={() => {
              setCurrentMonth((currentMonth + 1) % 12);
            }}
          >
            {months[(currentMonth + 1) % 12]}
          </span>
        </div>

        <div className={styles.weekContainer}>
          {week.map((day) => {
            return <span>{day}</span>;
          })}
        </div>
      </div>
    </>
  );
};
