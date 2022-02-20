import { useRef, useEffect, useState } from "react";
import styles from "../../styles/ChatWindow.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import PeerProfile from "../Profile/PeerProfile";

export default function ChatWindow({ peerID, setChatID }) {
  const scroll = useRef();
  const [chatArr, setChatArr] = useState([]);
  const { currentUser, profilePics, peerData, myPeers } = useAuth();
  
  useEffect(() => {
    scrollBottom();
  }, [chatArr]);

  const scrollBottom = () => {
    scroll.current.scrollIntoView();
  };

  const [chatRoomId, setChatRoomId] = useState("");
  const [showPeer, setShowPeer] = useState(false);

  useEffect(async() => {
    console.log("Mypoeers:", myPeers)

    let room = "";
    console.log(peerID);
    try{
      if (peerID < currentUser.uid) {
        room = peerID + "_" + currentUser.uid;
        console.log(room)
      } else {
        room = currentUser.uid + "_" + peerID;
        console.log(room)
      }

      // console.log("check rooom", room);
      
      await db
        .collection("ChatRoom")
        .doc(room)
        .get()
        .then((snap) => {
          if (!snap.exists) {
            db.collection("ChatRoom")
              .doc(room)
              .set({
                ChatRoomID: room,
                users: [currentUser.uid, peerID],
              });
          }
        });
    } catch(e) {
      console.log("Chatrroom ID error")
    }

    let opened = false;
    try {
      db.collection("ChatRoom")
        .doc(room)
        .collection("chats")
        .orderBy("time")
        .onSnapshot((snapshot) => {
          let tempChatArr = [];
          snapshot.forEach((snap) => {
            tempChatArr.push(snap.data());
          });

          // if(tempChatArr.length > 0){
          //   console.log("Last msg", tempChatArr[tempChatArr.length - 1]);
          // }
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
      console.log("Chats fetching error")
    }

    setChatRoomId(room);
    // console.log("penul",room)
    // console.log("ul",chatRoomId)
  }, [peerID])

  
  
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    console.log("sending to", chatRoomId);
    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: inputText,
      sentBy: currentUser.uid,
      time: new Date(),
      isRead: false,
    });
    setInputText("");
  };

  const [peer, setPeer] = useState();
  useEffect(() => {
    setPeer(peerData.find((o) => o.userID === peerID));
  }, [peerData, peerID]);

  const handleBack = () => {
    setChatID(null)
  }
  
  return (
    <>
      {showPeer && <PeerProfile setShowPeer={setShowPeer} index={myPeers.indexOf(peerID)} />}
      {!showPeer && 
        <div className={`${styles.container} ${chatArr && `${styles.block}`} `}>
          <div className={styles.header}>
            <div onClick={handleBack} className={styles.back}>
              <IoMdArrowBack />
            </div>
            
              <div onClick={() => setShowPeer(true)} className={styles.peer}>
                <div className={styles.dpmob}>
                  <img
                    src={profilePics[peerID]}
                    alt=""
                  />
                </div>
                <p>{peer && peer.name}</p>
              </div>
          </div>

          <div className={styles.chat}>
            {chatArr.map((data) => {
              return data.sentBy === currentUser.uid ? (
                <Reply
                  profilePic={profilePics[data.sentBy]}
                  time={data.time.toDate()}
                  message={data.message}
                />
              ) : (
                <Comment
                  profilePic={profilePics[data.sentBy]}
                  time={data.time.toDate()}
                  message={data.message}
                />
              );
            })}
            <div ref={scroll} style={{ backgroundColor: "black" }} />
          </div>
          {myPeers.indexOf(peerID) >= 0 && ( 
            <div className={styles.input}>
              <textarea
                rows={1}
                type="text"
                placeholder="Enter your message here"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
              <button onClick={handleSendMessage}>
                Send <IoMdSend />
              </button>
            </div>
          )}
        </div>
      }
    </>
    
  );
}

export const Comment = ({ profilePic, message, time }) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.comment}>
        <div className={styles.dp}>
          <img src={profilePic} alt="" />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>{time.getHours() + ":" + time.getMinutes()}</p>
        </div>
      </div>
    </div>
  );
};

export const Reply = ({ profilePic, message, time }) => {
  return (
    <div style={{whiteSpace: 'pre-wrap'}} className={styles.replyWrapper}>
      <div className={styles.reply}>
        <div className={styles.dp}>
          <img src={profilePic} alt="" />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>{time.getHours() + ":" + (time.getMinutes()<10 ? "0"+time.getMinutes() : time.getMinutes())}</p>
        </div>
      </div>
    </div>
  );
};