import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import styles from "../../styles/Deadlines.module.css";
import { BiLinkExternal } from "react-icons/bi";

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
  const [currentFullDate, setCurrentFullDate] = useState("");
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
    setCurrentFullDate(tempFullDate);
    let tempDeadlinesArr = [];
    db.collection("Deadlines")
      .doc(tempFullDate + "T00:00:00.000Z")
      .collection("events")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          tempDeadlinesArr.push(snap.data());
        });
        setCurrentDateDeadlines(tempDeadlinesArr);
      })
      .catch((err) => {
        console.log("Can't print deadlines");
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
    setCurrentFullDate(tempFullDate);
    if (!deadlinesObj[tempFullDate]) {
      setCurrentDateDeadlines([]);
      return;
    }
    let tempDeadlinesArr = [];
    db.collection("Deadlines")
      .doc(tempFullDate + "T00:00:00.000Z")
      .collection("events")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          tempDeadlinesArr.push(snap.data());
        });
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
              if (currentMonth === 0) {
                setCurrentYear(currentYear - 1);
              }
              setCurrentMonth((currentMonth - 1 + 12) % 12);
              setCurrentDate(0);
            }}
            className={styles.currentDate}
          >
            <span>{months[(currentMonth - 1 + 12) % 12]}</span>
            <span>{"<"}</span>
          </span>
          <span className={styles.currentDate}>
            <span>{months[currentMonth]} </span>
            <span> {currentYear}</span>
          </span>
          <span
            onClick={() => {
              if (currentMonth === 11) setCurrentYear(currentYear + 1);
              setCurrentMonth((currentMonth + 1) % 12);
              setCurrentDate(0);
            }}
            className={styles.currentDate}
          >
            <span>{months[(currentMonth + 1) % 12]}</span>
            <span>{">"}</span>
          </span>
        </div>

        <div className={styles.weekContainer}>
          {week.map((day, index) => {
            return <span key={index}>{day}</span>;
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
            .map((date, index) => {
              return (
                <span
                  key={index}
                  className={`${styles.date} ${styles.prevMonthDate}`}
                >
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
            .map((date, index) => {
              let tempdate = date,
                tempMonth = currentMonth + 1;
              if (tempdate < 10) tempdate = "0" + date;
              if (tempMonth < 10) tempMonth = "0" + tempMonth;

              const fullDate = `${currentYear}-${tempMonth}-${tempdate}`;
              return (
                <span
                  key={index}
                  className={`${styles.date} ${
                    deadlinesObj[fullDate] ? styles.deadlineDate : ""
                  } ${fullDate === currentFullDate ? styles.selectedDate : ""}
                  ${fullDate} ${currentFullDate}`}
                  onClick={handleDeadlineClick}
                  data-date={date}
                >
                  {date}
                </span>
              );
            })}
        </div>
      </div>
      {currentDate !== 0 && (
        <div>
          <div className={styles.deadlinesHeading}>
            <h2>
              Deadlines for {currentDate} {months[currentMonth]}, {currentYear}
            </h2>
          </div>
          {currentDateDeadlines.map((deadline, index) => {
            return (
              <div key={index} className={styles.deadlineContainer}>
                <a
                  href={deadline.link.trim()}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <h2>
                    {deadline.title}
                    <div className={styles.openLink}>
                      <BiLinkExternal />
                    </div>
                  </h2>
                </a>
              </div>
            );
          })}
          {currentDateDeadlines.length === 0 && (
            <h3 className={styles.noDeadlinesFound}>
              No deadlines on selected date
            </h3>
          )}
        </div>
      )}
    </>
  );
};
