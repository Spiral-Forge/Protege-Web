import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";
export default function Messenger() {
  return (
    <div className={styles.container}>
      <Conversations />
      <ChatWindow />
    </div>
  );
}
