import styles from "../../styles/ChatWindow.module.css";
import { IoMdSend } from "react-icons/io";

export default function ChatWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.chat}>
        <Comment />
        <Comment />
        <Reply />
        <Comment />
        <Reply />
        <Comment />
        <Reply />
        <Reply />
        <Comment />
      </div>
      <div className={styles.input}>
        <textarea rows={1} type="text" placeholder="Enter your message here" />
        <button>
          Send <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export const Comment = () => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.comment}>
        <div className={styles.dp}>
          <img
            src="https://avatars.githubusercontent.com/u/44186440?v=4"
            alt=""
          />
        </div>
        <div className={styles.message}>
          <h5>
            Yoyoyo yoyoyyoyy whats uppppp Yoyoyoy oyoyyoyy whats uppppp Yoyoyoy
            oyoyyoyy whats uppppp
          </h5>
          <p>6:56 PM</p>
        </div>
      </div>
    </div>
  );
};

export const Reply = () => {
  return (
    <div className={styles.replyWrapper}>
      <div className={styles.reply}>
        <div className={styles.dp}>
          <img src="https://gcdn.pbrd.co/images/a32jYcov1Buc.png?o=1" alt="" />
        </div>
        <div className={styles.message}>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse saepe
            sit molestiae dicta commodi. Vel voluptate ex ipsum sunt
            reprehenderit, mquam.
          </h5>
          <p>7:00 PM</p>
        </div>
      </div>
    </div>
  );
};
