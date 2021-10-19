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
    db.collection("Events").add({
      ...formData,
      Date: date,
      Time: time,
      Approved: false,
    });
    setShowModal(false);
  };
  const validate = () => {
    try {
      if (!formData.Name) {
        throw "Title";
      }
      if (!time) {
        throw "Time";
      }
      if (!date) {
        throw "Date";
      }
      if (!formData.Venue) {
        throw "Venue";
      }
      if (!formData.ImageUrl) {
        throw "Image URL";
      }
      if (!formData.Description) {
        throw "Description";
      }
      if (!formData.Link) {
        throw "Event link";
      }
    } catch (err) {
      window.alert(`${err} field is required`);
      return false;
    }
    return true;
  };
  const [formData, setFormData] = useState({
    Name: "",
    Venue: "",
    ImageUrl: "",
    Description: "",
    Link: "",
  });
  const handleFormDataChange = (e) => {
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
            placeholder="Title"
            name="Name"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsCalendarDay className={styles.icon} />
          <DatePicker
            placeholderText="Date"
            selected={date}
            onChange={setDate}
          />
        </div>
        <div className={styles.flex}>
          <BiTimeFive className={styles.icon} />
          <DatePicker
            selected={time}
            onChange={setTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Time"
          />
        </div>
        <div className={styles.flex}>
          <FaMapMarkerAlt className={styles.icon} />
          <input
            type="text"
            placeholder="Venue"
            name="Venue"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsCardImage className={styles.icon} />
          <input
            type="text"
            placeholder="Image Url"
            name="ImageUrl"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsFillFileTextFill className={styles.icon} />
          <textarea
            rows="1"
            placeholder="Description"
            name="Description"
            onChange={handleFormDataChange}
          />
        </div>
        <div className={styles.flex}>
          <BsLink45Deg className={styles.icon} />
          <input
            type="text"
            placeholder="Event Url"
            name="Link"
            onChange={handleFormDataChange}
          />
        </div>
      </div>
      <div className={styles.cta}>
        <button onClick={() => setShowModal(false)}>Cancle</button>
        <button onClick={handleSubmit}>Add Event</button>
      </div>
    </div>
  );
}
