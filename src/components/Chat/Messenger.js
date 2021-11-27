import "./messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "./ChatOnline";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
export default function Messenger() {
  const { currentUser, isMentor } = useAuth();
  const { id } = useParams();
  const [chatArr, setChatArr] = useState([]);
  const [inputText, setInputText] = useState("");
  let chatRoomId;
  useEffect(() => {
    if (isMentor) {
      chatRoomId = currentUser.uid + id;
    } else {
      chatRoomId = id + currentUser.uid;
    }

    db.collection("ChatRoom")
      .doc(chatRoomId)
      .collection("chats")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        let tempChatArr = [];
        snapshot.forEach((snap) => {
          tempChatArr.push(snap.data());
        });
        setChatArr(tempChatArr);
      });
  }, []);

  const handleSendMessage = () => {
    if (isMentor) {
      chatRoomId = currentUser.uid + id;
    } else {
      chatRoomId = id + currentUser.uid;
    }
    console.log(chatRoomId);
    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: inputText,
      sentBy: currentUser.uid,
      timestamp: new Date().getTime(),
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {chatArr.map((msg) => {
                return (
                  <Message
                    message={msg.message}
                    own={msg.sentBy === currentUser.uid}
                  />
                );
              })}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write something"
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSendMessage}>
                Send{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
}
