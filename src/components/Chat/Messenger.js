import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import ChatWindow from "./ChatWindow";
import Conversations from "./Conversations";

export default function Messenger() {
  const { currentUser, myPeers, profilePics } = useAuth();
  const [peerData, setPeerData] = useState([]);
  const [chatID, setChatID] = useState(null);
  
  useEffect(async () => {
    // console.log(currentUser)
    // console.log("user data: ", userData)
    // console.log("peers: ", myPeers)

    // let tempPeerArr = [];
    // let profilePicsObj = {};
    // for (const id of myPeers) {
    //   let photoUrl = null;
    //   try{
    //     await db
    //     .collection("users")
    //     .doc(id)
    //     .get()
    //     .then((doc) => {
    //       tempPeerArr.push({ name: doc.data().name, userID: id });
    //       photoUrl = doc.data().photoUrl
    //     });
    //   } catch (e) {
    //     console.log("Peer data error")
    //     console.log(id)
    //   }

    //   let tempDownloadURL;
    //   if(photoUrl){
    //     try {
    //       tempDownloadURL = await ProfilePicStorageRef.child(id).getDownloadURL();
    //     } catch (err) {
    //       console.log("Uploaded img error")
    //     }
    //   }
    //   else {
    //     tempDownloadURL =
    //           "https://avatars.dicebear.com/api/micah/" + id + ".svg";
    //   }
    //   profilePicsObj[id] = tempDownloadURL;
    // }
    // setPeerData(tempPeerArr);
    // console.log("PEEER DATA:", tempPeerArr)

    // let ownProfilePic;
    // if(currentUser.photoUrl){
    //   try {
    //     ownProfilePic = await ProfilePicStorageRef.child(
    //       currentUser.uid
    //     ).getDownloadURL();
    //   } catch (err) {
    //     console.log("profile pic error")
    //   }
    // }
    // else {
    //     ownProfilePic =
    //       "https://avatars.dicebear.com/api/micah/" + currentUser.uid + ".svg";
    // }
    // profilePicsObj[currentUser.uid] = ownProfilePic;
    // setProfilePics(profilePicsObj);
  }, []);

  return (
    <div className={styles.container}>
      <Conversations setChatID={setChatID} peerData={peerData}  />
      {chatID && <ChatWindow
        peerData={peerData}
        peerID={chatID}
        setChatID={setChatID}
      />}
    </div>
  );
}