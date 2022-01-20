import { useRef, useEffect, useState } from "react";
import styles from "../../styles/ChatWindow.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {useHistory} from "react-router-dom"

export default function ChatWindow({ profilePics, id, chatArr, peerData, setChat, chat }) {
  const scroll = useRef();
  const { currentUser, isMentor, myPeers } = useAuth();
  useEffect(() => {
    scrollBottom();
  }, [chatArr]);

  // console.log("Chat window peerdata:",peerData)
  // console.log("photos: ", profilePics)

  const scrollBottom = () => {
    scroll.current.scrollIntoView();
  };
  const [chatRoomId, setChatRoomId] = useState("");
  const [inputText, setInputText] = useState("");
  const  history  = useHistory();

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
  
    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: inputText,
      sentBy: currentUser.uid,
      time: new Date().getTime(),
    });
    setInputText("");
  };
  const [peer, setPeer] = useState();
  useEffect(() => {
    if (isMentor) {
      setChatRoomId(currentUser.uid + "_" + id);
    } else {
      setChatRoomId(id + "_" + currentUser.uid);
    }
  }, [id]);

  useEffect(() => {
    setPeer(peerData.find((o) => o.userID === id));
  }, [peerData, id]);

  const handleBack = () => {
    setChat(false)
  }
  
  return (
    <div className={`${styles.container} ${chatArr && chat && `${styles.block}`} `}>
      <div className={styles.header}>
        <div onClick={handleBack} className={styles.back}>
          <IoMdArrowBack />
        </div>
        <div className={styles.peer}>
          {/* <div className={styles.dpmob}> */}
            {/* <img
              src={peer.photoUrl}
              alt=""
            /> */}
          {/* </div> */}
          <p>{peer && peer.name}</p>
        </div>
      </div>

      <div className={styles.chat}>
        {chatArr.map((data) => {
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
      {myPeers && myPeers.indexOf(id) >= 0 && ( 
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
