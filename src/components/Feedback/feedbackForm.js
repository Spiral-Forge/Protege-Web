import { useRef, useEffect, useState } from "react";
import styles from "../../styles/FeedbackForm.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import MentorForm from "./mentorFeedback";
import MenteeForm from "./menteeFeedback";

export default function FeedbackForm({ profilePics, peerID, peerData, setChatID }) {
  const { currentUser, isMentor, myPeers } = useAuth();
  
  
  return (
    <div className={`${styles.container} ${styles.block}` }>
    {isMentor && <MentorForm profilePics = {profilePics} peerID = {peerID} peerData = {peerData} setChatID = {setChatID} />}
    {!isMentor && <MenteeForm profilePics = {profilePics} peerID = {peerID} peerData = {peerData} setChatID = {setChatID} />}
    </div>
  );
}

