import styles from "../../../styles/Event.module.css";
import EventCard from "./EventCard";
import { GoPlus } from "react-icons/go";
import Masonry from "react-masonry-css";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import EventForm from "./EventForm";
import { useAuth } from "../../../context/AuthContext";

export default function Event() {
  const { currentUser, isMentor } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  useEffect(async () => {
    let eventsArr = [];
    const querySnapshot = await db.collection("events").get();
    querySnapshot.forEach((doc) => {
      if (doc.data().approved) eventsArr.push(doc.data());
    });
    setEvents(eventsArr);
  }, []);
  return (
    <div className={styles.container}>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {events.map((event) => {
          return <EventCard event={event} />;
        })}
      </Masonry>

      {currentUser && isMentor && (
        <>
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
        </>
      )}
    </div>
  );
}
