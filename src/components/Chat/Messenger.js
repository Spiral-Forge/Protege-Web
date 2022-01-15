import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";
export default function Messenger() {
  const [chat, setChat] = useState(false);
  const { currentUser, isMentor, userData } = useAuth();
  const { id } = useParams();
  const [chatArr, setChatArr] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [profilePics, setProfilePics] = useState({});
  let chatRoomId;
  useEffect(async () => {
    if (isMentor) {
      chatRoomId = currentUser.uid + "_" + id;
    } else {
      chatRoomId = id + "_" + currentUser.uid;
    }
    if (id) {
      await db
        .collection("ChatRoom")
        .doc(chatRoomId)
        .get()
        .then((snap) => {
          if (!snap.exists) {
            db.collection("ChatRoom")
              .doc(chatRoomId)
              .set({
                ChatRoomID: chatRoomId,
                users: [currentUser.uid, id],
              });
          }
        });
    }
    db.collection("ChatRoom")
      .doc(chatRoomId)
      .collection("chats")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        let tempChatArr = [];
        snapshot.forEach((snap) => {
          tempChatArr.push(snap.data());
        });
        setChatArr(tempChatArr);
      });
    let tempPeerArr = [];
    let profilePicsObj = {};
    for (const id of userData.peerID) {
      await db
        .collection("users")
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

  return (
    <div className={styles.container}>
      <Conversations peerData={peerData} profilePics={profilePics} />
      <ChatWindow profilePics={profilePics} id={id} chat={chatArr} />
    </div>
  );
}
