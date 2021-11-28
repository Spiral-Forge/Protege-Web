import "./messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "./ChatOnline";
import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { db, ProfilePicStorageRef } from "../../firebase";
export default function Messenger() {
  const { currentUser, isMentor, peerID } = useAuth();
  const { id } = useParams();
  const [chatArr, setChatArr] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [profilePics, setProfilePics] = useState({});
  let chatRoomId;
  useEffect(async () => {
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
    let tempPeerArr = [];
    let profilePicsObj = {};
    for (const id of peerID) {
      await db
        .collection("Users")
        .doc(id)
        .get()
        .then((doc) => {
          tempPeerArr.push({ ...doc.data(), userID: id });
        });
      let tempDownloadURL;
      try {
        tempDownloadURL = await ProfilePicStorageRef.child(id).getDownloadURL();
      } catch (err) {
        if (err) {
          tempDownloadURL =
            "https://avatars.dicebear.com/api/micah/" + id + ".svg";
        }
      }
      profilePicsObj[id] = tempDownloadURL;
    }
    setPeerData(tempPeerArr);
    let ownProfilePic;
    try {
      ownProfilePic = await ProfilePicStorageRef.child(
        currentUser.uid
      ).getDownloadURL();
    } catch (err) {
      if (err) {
        ownProfilePic =
          "https://avatars.dicebear.com/api/micah/" + currentUser.uid + ".svg";
      }
    }
    profilePicsObj[currentUser.uid] = ownProfilePic;
    setProfilePics(profilePicsObj);
  }, []);

  const handleSendMessage = () => {
    console.log(chatRoomId);
    if (inputText.trim() === "") return;
    if (isMentor) {
      chatRoomId = currentUser.uid + id;
    } else {
      chatRoomId = id + currentUser.uid;
    }

    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: inputText,
      sentBy: currentUser.uid,
      timestamp: new Date().getTime(),
    });
    setInputText("");
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {peerData
              .filter((x) => {
                return x.name.toLowerCase().includes(searchInput);
              })
              .map((peer, index) => {
                return (
                  <Link to={`/chat/${peer.userID}`} key={index}>
                    <Conversation pic={profilePics[peer.userID]} peer={peer} />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {chatArr.map((msg, index) => {
                return (
                  <Message
                    key={index}
                    message={msg.message}
                    pic={profilePics[msg.sentBy]}
                    own={msg.sentBy === currentUser.uid}
                  />
                );
              })}
            </div>
            <div className="chatBoxBottom">
              <input
                type="text"
                className="chatMessageInput"
                placeholder="Write something"
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              ></input>
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
