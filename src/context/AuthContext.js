import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

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
          console.log("Fetching user")
          const userDoc = await db.collection("users").doc(user.uid).get();
          setUserData(userDoc.data());

          if (userDoc.data().post === "Mentor") {
            setIsMentor(true);
          }

          let peerIDs = userDoc.data().peerId;
          setMyPeers(peerIDs);
          if(peerIDs){
            let tempPeerArr = [];
            console.log("Fetching peer data")
            for (const id of peerIDs) {
              try{
                await db
                .collection("users")
                .doc(id)
                .get()
                .then((doc) => {
                  tempPeerArr.push({...doc.data(), userID:id});
                });
              } catch (e) {
                console.log("Peer data error", id)
              }
            }
            setPeerData(tempPeerArr);
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
