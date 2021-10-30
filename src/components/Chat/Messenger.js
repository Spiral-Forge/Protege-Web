import { useState } from "react";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";
export default function Messenger() {
  const [chat, setChat] = useState(false);

  return (
    <div className={styles.container}>
      <Conversations setChat={setChat} />
      <ChatWindow chat={chat} setChat={setChat} />
    </div>
  );
}
