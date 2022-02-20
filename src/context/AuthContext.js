import React, { useContext, useState, useEffect } from "react";
import { auth, db, ProfilePicStorageRef } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);
  const [userData, setUserData] = useState();
  const [myPeers, setMyPeers] = useState();
  const [peerData, setPeerData] = useState([]);
  const [profilePics, setProfilePics] = useState({});

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await db.collection("users").doc(user.uid).get();
          setUserData(userDoc.data());
          
          if (userDoc.data().post === "Mentor") {
            setIsMentor(true);
          }

          let peerIDs = userDoc.data().peerId;
          setMyPeers(peerIDs);
          if(peerIDs){
            let tempPeerArr = [];
            let profilePicsObj = {}
            console.log("Fetching peer data")
            for (const id of peerIDs) {
              let photoUrl = null;
              try{
                await db
                .collection("users")
                .doc(id)
                .get()
                .then((doc) => {
                  tempPeerArr.push({...doc.data(), userID:id});
                  photoUrl = doc.data().photoUrl
                });
              } catch (e) {
                console.log("Peer data error", id)
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

            let ownProfilePic;
            if(userDoc.data().photoUrl){
              try {
                ownProfilePic = await ProfilePicStorageRef.child(
                  userDoc.data().userID
                ).getDownloadURL();
              } catch (err) {
                console.log("profile pic error")
              }
            }
            else {
                ownProfilePic =
                  "https://avatars.dicebear.com/api/micah/" + userDoc.data().userID + ".svg";
            }
            profilePicsObj[userDoc.data().userID] = ownProfilePic;
            setProfilePics(profilePicsObj);
          }
        } catch (err) {
          console.log("CAN'T FETCH USER");
        }

        
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isMentor,
    myPeers,
    peerData,
    profilePics,
    signUp,
    signIn,
    signOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
