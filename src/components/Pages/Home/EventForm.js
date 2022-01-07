import { useState } from "react";
import styles from "../../../styles/EventForm.module.css";
import { MdOutlineTextFields } from "react-icons/md";
import {
  BsCalendarDay,
  BsCardImage,
  BsFillFileTextFill,
  BsLink45Deg,
} from "react-icons/bs";

import { BiTimeFive } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../../firebase";
export default function EventForm({ setShowModal }) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const handleSubmit = async (e) => {
    if (!validate()) return;
    db.collection("events").add({
      ...formData,
      dateTime: date,
      // time: time,
      approved: false,
    });
    setShowModal(false);
  };
  const validate = () => {
    try {
      if (!formData.name) {
        throw "Title";
      }
      if (!date) {
        throw "Date";
      }
      if (!formData.venue) {
        throw "Venue";
      }
      if (!formData.imageUrl) {
        throw "Image URL";
      }
      if (!formData.description) {
        throw "Description";
      }
      if (!formData.registrationLink) {
        throw "Event link";
      }
    } catch (err) {
      window.alert(`${err} field is required`);
      return false;
    }
    return true;
  };
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    imageUrl: "",
    description: "",
    registrationLink: "",
  });
  const handleFormDataChange = (e) => {
    console.log("HELLLOOO")
    console.log(e.target)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <div className={styles.inputs}>
        <div className={styles.flex}>
          <MdOutlineTextFields className={styles.icon} />
          <input
            type="text"
            placeholder="Event Title"
            name="name"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsCalendarDay className={styles.icon} />
          <DatePicker 
            placeholderText="Date"
            showTimeSelect
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={date}
            onChange={date => setDate(date)} 
          />
        </div>
        <div className={styles.flex}>
          <FaMapMarkerAlt className={styles.icon} />
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsCardImage className={styles.icon} />
          <input
            type="text"
            placeholder="Event Poster link"
            name="imageUrl"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsFillFileTextFill className={styles.icon} />
          <textarea
            rows="1"
            placeholder="Description"
            name="description"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsLink45Deg className={styles.icon} />
          <input
            type="text"
            placeholder="Event Registration Link"
            name="registrationLink"
            onChange={handleFormDataChange}
          />
        </div>
      </div>
      <div className={styles.cta}>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={handleSubmit}>Add Event</button>
      </div>
    </div>
  );
}
