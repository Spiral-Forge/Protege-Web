import { useState } from "react";
import styles from "../../../styles/Event.module.css";
import EventCard from "./EventCard";
import { GoPlus } from "react-icons/go";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import EventForm from "./EventForm";
export default function Event() {
  const [showModal, setShowModal] = useState(false);

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
