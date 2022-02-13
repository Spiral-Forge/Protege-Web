import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, ProfilePicStorageRef } from "../../firebase";
import styles from "../../styles/Messenger.module.css";
import styles1 from "../../styles/FeedbackList.module.css";
import PeerTiles from "./peerList";
import FeedbackForm from "./feedbackForm";

export default function FeedbackList() {
  const { currentUser, isMentor, userData, myPeers } = useAuth();
  const [peerData, setPeerData] = useState([]);
  const [profilePics, setProfilePics] = useState({});
  const [chatID, setChatID] = useState(null);

  const[isAccessible, setAccessibility] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(async () => {
    // console.log(currentUser)
    // console.log("user data: ", userData)
    // console.log("peers: ", myPeers)
    var today = new Date();
    console.log(today.getDate());

    if (today.getDate() >= 25) {
      setAccessibility(true);
    }

    let tempPeerArr = [];
    let profilePicsObj = {};
    for (const id of myPeers) {
      let photoUrl = null;
      try{
        await db
        .collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          tempPeerArr.push({ name: doc.data().name, userID: id });
          photoUrl = doc.data().photoUrl
        });
      } catch (e) {
        console.log("Peer data error")
        console.log(id)
      }

      let tempDownloadURL;
      if(photoUrl){
        try {
          tempDownloadURL = await ProfilePicStorageRef.child(id).getDownloadURL();
        } catch (err) {
          console.log("Uploaded img error")
        }
      }
      else {
        tempDownloadURL =
              "https://avatars.dicebear.com/api/micah/" + id + ".svg";
      }
      profilePicsObj[id] = tempDownloadURL;
    }
    setPeerData(tempPeerArr);
    console.log("PEEER DATA:", tempPeerArr)

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
    console.log(peerData);
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles1.container}>
        <div className={styles1.top}>
  
  <div className={styles1.heading}>
    <h1>Feedback</h1>
  </div>
</div>
    {!isAccessible && <div> <h5>Feedback is not available before 25th of the month.</h5></div>}
    {isAccessible && <PeerTiles setChatID={setChatID} peerData={peerData} profilePics={profilePics} />}
      </div>
      {chatID && <FeedbackForm
        peerData={peerData}
        profilePics={profilePics}
        peerID={chatID}
        setChatID={setChatID}
      />}
    </div>
  );
}