import { useEffect, useState } from "react";
import styles from "../../styles/Messenger.module.css";
import styles1 from "../../styles/FeedbackList.module.css";
import PeerTiles from "./peerList";
import FeedbackForm from "./feedbackForm";

export default function FeedbackList() {
  const [chatID, setChatID] = useState(null);
  const [isAccessible, setAccessibility] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(async () => {

    var today = new Date();
    console.log(today.getDate());

    if (today.getDate() >= 25) {
      setAccessibility(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles1.container}>
        <div className={styles1.top}>
          <div className={styles1.heading}>
            <h1>Feedback</h1>
          </div>
        </div>
        {!isAccessible && <div> <p className={styles1.errorMessage}>Feedback is not available before 25th of the month.</p></div>}
        {isAccessible && <PeerTiles setChatID={setChatID} />}
      </div>
      {chatID && <FeedbackForm
        peerID={chatID}
        setChatID={setChatID}
      />}
    </div>
  );
}