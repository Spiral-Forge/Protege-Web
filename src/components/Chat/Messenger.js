import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";

export default function Messenger() {
  const [chatID, setChatID] = useState(null);
  return (
    <div className={styles.container}>
      <Conversations setChatID={setChatID} />
      {chatID && <ChatWindow
        peerID={chatID}
        setChatID={setChatID}
      />}
    </div>
  );
}