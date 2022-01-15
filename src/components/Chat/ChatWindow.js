import { useRef, useEffect, useState } from "react";
import styles from "../../styles/ChatWindow.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

export default function ChatWindow({ profilePics, id, chat, setChat }) {
  const scroll = useRef();
  const { currentUser, isMentor, userData } = useAuth();
  useEffect(() => {
    scrollBottom();
  }, [chat]);

  const scrollBottom = () => {
    scroll.current.scrollIntoView();
  };
  let [chatRoomId, setChatRoomId] = useState("");
  const [inputText, setInputText] = useState("");
  console.log(currentUser.uid);
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    console.log(chatRoomId);
    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: inputText,
      sentBy: currentUser.uid,
      time: new Date().getTime(),
    });
    setInputText("");
  };
  useEffect(() => {
    if (isMentor) {
      setChatRoomId(currentUser.uid + "_" + id);
    } else {
      setChatRoomId(id + "_" + currentUser.uid);
    }
  }, []);
  return (
    <div className={`${styles.container} ${chat && `${styles.block}`} `}>
      <div className={styles.header}>
        <div onClick={() => setChat(false)} className={styles.back}>
          <IoMdArrowBack />
        </div>
        <div className={styles.peer}>
          <div className={styles.dpmob}>
            <img
              src="https://avatars.githubusercontent.com/u/44186440?v=4"
              alt=""
            />
          </div>
          <p>Harsh Pandey</p>
        </div>
      </div>
      <div className={styles.chat}>
        {chat.map((data) => {
          return data.sentBy === currentUser.uid ? (
            <Reply
              profilePic={profilePics[data.sentBy]}
              time={data.time}
              message={data.message}
            />
          ) : (
            <Comment
              profilePic={profilePics[data.sentBy]}
              time={data.time}
              message={data.message}
            />
          );
        })}
        <div ref={scroll} style={{ backgroundColor: "black" }} />
      </div>
      {id in userData.peerID && (
        <div className={styles.input}>
          <textarea
            rows={1}
            type="text"
            placeholder="Enter your message here"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <button onClick={handleSendMessage}>
            Send <IoMdSend />
          </button>
        </div>
      )}
    </div>
  );
}

export const Comment = ({ profilePic, message, time }) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.comment}>
        <div className={styles.dp}>
          <img src={profilePic} alt="" />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>{new Date(time).toLocaleString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};

export const Reply = ({ profilePic, message, time }) => {
  return (
    <div className={styles.replyWrapper}>
      <div className={styles.reply}>
        <div className={styles.dp}>
          <img src={profilePic} alt="" />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>{new Date(time).toLocaleString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};
