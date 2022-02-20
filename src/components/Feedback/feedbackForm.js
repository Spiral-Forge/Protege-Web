import styles from "../../styles/FeedbackForm.module.css";
import { useAuth } from "../../context/AuthContext";
import MentorForm from "./mentorFeedback";
import MenteeForm from "./menteeFeedback";

export default function FeedbackForm({ peerID, setChatID }) {
  const { isMentor } = useAuth();
  
  return (
    <div className={`${styles.container} ${styles.block}` }>
    {isMentor && <MentorForm peerID = {peerID} setChatID = {setChatID} />}
    {!isMentor && <MenteeForm peerID = {peerID} setChatID = {setChatID} />}
    </div>
  );
}

