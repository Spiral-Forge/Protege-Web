import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";

export default function Messenger() {
  const { currentUser, isMentor, userData, myPeers } = useAuth();
  const { id } = useParams();
  const [chatArr, setChatArr] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [profilePics, setProfilePics] = useState({});
  const [chat, setChat] = useState(false);

  let chatRoomId;
  if (isMentor) {
    chatRoomId = currentUser.uid + "_" + id;
  } else {
    chatRoomId = id + "_" + currentUser.uid;
  }

  useEffect(async () => {
    console.log("user data: ", userData)
    console.log("peers: ", myPeers)
    if (id) {
      try{
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
      } catch(e) {
        console.log("Chatrroom ID error")
      }
    }

    let tempPeerArr = [];
    let profilePicsObj = {};
    for (const id of myPeers) {
      await db
        .collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          tempPeerArr.push({ name: doc.data().name, userID: id });
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
    console.log("PEEER DATA:", tempPeerArr)

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
  }, [peerData, userData]);
  let opened = false;
  
  useEffect(() => {
    try{
      db.collection("ChatRoom")
        .doc(chatRoomId)
        .collection("chats")
        .orderBy("time")
        .onSnapshot((snapshot) => {
          let tempChatArr = [];
          snapshot.forEach((snap) => {
            tempChatArr.push(snap.data());
          });
          console.log("Last msg? ", tempChatArr[tempChatArr.length - 1]);
          if (
            opened &&
            tempChatArr[tempChatArr.length - 1].sentBy !== currentUser.uid
          ) {
            document.title = "New Message";
          }
          opened = true;
          console.log("CHAT ARRAY:", tempChatArr);
          setChatArr(tempChatArr);
        });
    } catch(e) {
      console.log("Chats fetching")
    }
    
  }, [id]);

  return (
    <div className={styles.container}>
      <Conversations setChat={setChat} peerData={peerData} profilePics={profilePics} />
      <ChatWindow
        peerData={peerData}
        profilePics={profilePics}
        id={id}
        chatArr={chatArr}
        chat={chat}
        setChat={setChat}
      />
    </div>
  );
}
