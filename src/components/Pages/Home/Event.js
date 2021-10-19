import styles from "../../../styles/Event.module.css";
import EventCard from "./EventCard";
import { GoPlus } from "react-icons/go";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import EventForm from "./EventForm";

export default function Event() {
  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([]);
  useEffect(async () => {
    let eventsArr = [];
    const querySnapshot = await db.collection("Events").get();
    querySnapshot.forEach((doc) => {
      if (doc.data().Approved) eventsArr.push(doc.data());
    });
    setEvents(eventsArr);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {events.map((event) => {
          return <EventCard event={event} />;
        })}
      </div>
      <div className={styles.btn}>
        <button onClick={() => setShowModal(true)}>
          <GoPlus />
        </button>
      </div>
      <Dialog
        PaperProps={{
          style: {
            overflow: "visible",
          },
        }}
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EventForm setShowModal={setShowModal} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
