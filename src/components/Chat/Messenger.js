import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";

export default function Messenger() {
  const { currentUser, myPeers, peerData } = useAuth();
  const [profilePics, setProfilePics] = useState({});
  const [chatID, setChatID] = useState(null);
  
  useEffect(async () => {
    console.log(peerData)
    // console.log(currentUser)
    // console.log("user data: ", userData)
    // console.log("peers: ", myPeers)

    // let tempPeerArr = [];
    let profilePicsObj = {};
    for (const idx in peerData) {
      console.log(peerData[idx]);
      let tempDownloadURL;
      if(peerData[idx].photoUrl){
        try {
          tempDownloadURL = await ProfilePicStorageRef.child(peerData[idx].userID).getDownloadURL();
        } catch (err) {
          console.log("Uploaded img error")
        }
      }
      else {
        tempDownloadURL =
              "https://avatars.dicebear.com/api/micah/" + peerData[idx].userID + ".svg";
      }
      profilePicsObj[peerData[idx].userID] = tempDownloadURL;
    }
    // setPeerData(tempPeerArr);
    // console.log("PEEER DATA:", tempPeerArr)

    let ownProfilePic;
    if(currentUser.photoUrl){
      try {
        ownProfilePic = await ProfilePicStorageRef.child(
          currentUser.uid
        ).getDownloadURL();
      } catch (err) {
        console.log("profile pic error")
      }
    }
    else {
        ownProfilePic =
          "https://avatars.dicebear.com/api/micah/" + currentUser.uid + ".svg";
    }
    profilePicsObj[currentUser.uid] = ownProfilePic;
    setProfilePics(profilePicsObj);
  }, []);

  return (
    <div className={styles.container}>
      <Conversations setChatID={setChatID} peerData={peerData} profilePics={profilePics} />
      {chatID && <ChatWindow
        profilePics={profilePics}
        peerID={chatID}
        setChatID={setChatID}
      />}
    </div>
  );
}