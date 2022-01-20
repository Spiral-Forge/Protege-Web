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
      // console.log(user.emailVerified)

      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await db.collection("users").doc(user.uid).get();
          setUserData(userDoc.data());
          setMyPeers(userDoc.data().peerId)
          if (userDoc.data().post === "Mentor") {
            setIsMentor(true);
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
