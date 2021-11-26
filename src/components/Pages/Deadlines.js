import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
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
  const [currentDate, setCurrentDate] = useState(parseInt(today.getDate()));
  const [currentDateDeadlines, setCurrentDateDeadlines] = useState([]);
  const [deadlinesObj, setDeadlinesObj] = useState({});
  useEffect(async () => {
    let tempObj = {};
    await db
      .collection("Deadlines")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          tempObj[snap.id.split("T")[0].trim()] = true;
        });
      });
    setDeadlinesObj(tempObj);

    let tempDate = parseInt(today.getDate()),
      tempMonth = parseInt(today.getMonth()) + 1;
    if (tempDate < 10) tempDate = "0" + tempDate;
    if (tempMonth < 10) tempMonth = "0" + tempMonth;

    const tempFullDate = `${today.getFullYear()}-${tempMonth}-${tempDate}`;
    let tempDeadlinesArr = [];
    db.collection("Deadlines")
      .doc(tempFullDate + "T12:00:00.000Z")
      .collection("Listed")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          tempDeadlinesArr.push(snap.data());
        });
        console.log(tempDeadlinesArr);
        setCurrentDateDeadlines(tempDeadlinesArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeadlineClick = (e) => {
    let tempDate = e.target.dataset.date,
      tempMonth = currentMonth + 1;
    setCurrentDate(tempDate);
    if (tempDate < 10) tempDate = "0" + tempDate;
    if (tempMonth < 10) tempMonth = "0" + tempMonth;

    const tempFullDate = `${currentYear}-${tempMonth}-${tempDate}`;
    let tempDeadlinesArr = [];
    db.collection("Deadlines")
      .doc(tempFullDate + "T12:00:00.000Z")
      .collection("Listed")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          tempDeadlinesArr.push(snap.data());
        });
        console.log(tempDeadlinesArr);
        setCurrentDateDeadlines(tempDeadlinesArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.calendarContainer}>
        <div className={styles.monthsContainer}>
          <span
            onClick={() => {
              if (currentMonth === 0) setCurrentYear(currentYear - 1);
              setCurrentMonth((currentMonth - 1 + 12) % 12);
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
              if (currentMonth === 11) setCurrentYear(currentYear + 1);
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
        <div className={styles.datesContainer}>
          {[
            ...Array(
              new Date(currentYear, currentMonth - 1, 0).getDate() + 1
            ).keys(),
          ]
            .slice(
              new Date(currentYear, currentMonth - 1, 0).getDate() -
                new Date(currentYear, currentMonth, 1).getDay() +
                1
            )
            .map((date) => {
              return (
                <span className={`${styles.date} ${styles.prevMonthDate}`}>
                  {date}
                </span>
              );
            })}
          {[
            ...Array(
              new Date(currentYear, currentMonth, 0).getDate() + 1
            ).keys(),
          ]
            .slice(1)
            .map((date) => {
              let tempdate = date,
                tempMonth = currentMonth + 1;
              if (tempdate < 10) tempdate = "0" + date;
              if (tempMonth < 10) tempMonth = "0" + currentMonth;

              const fullDate = `${currentYear}-${tempMonth}-${tempdate}`;
              return (
                <span
                  className={`${styles.date} ${
                    deadlinesObj[fullDate] && styles.deadlineDate
                  }`}
                  onClick={handleDeadlineClick}
                  data-date={date}
                >
                  {date}
                </span>
              );
            })}
        </div>
      </div>
      <div>
        <div className={styles.deadlinesHeading}>
          <h1>
            Deadlines for {currentDate} {months[currentMonth]}, {currentYear}
          </h1>
        </div>
        {currentDateDeadlines.map((deadline) => {
          return (
            <div className={styles.deadlineContainer}>
              <h2>{deadline.Title}</h2>
              Link:{" "}
              <a href={deadline.Link.trim()} target="_blank" rel="noreferrer">
                {deadline.Link}
              </a>
            </div>
          );
        })}
        {currentDateDeadlines.length === 0 && (
          <h2 className={styles.noDeadlinesFound}>
            No deadlines on selected date
          </h2>
        )}
      </div>
    </>
  );
};
