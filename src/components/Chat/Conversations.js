import styles from "../../styles/Conversations.module.css";
import { useAuth } from "../../context/AuthContext";
import {  useHistory} from "react-router-dom";
export default function Conversations({ setChatID, profilePics }) {
  const { userData, peerData, currentUser } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.img}>
          <img
            src={
              currentUser.photoUrl ||
              `https://avatars.dicebear.com/api/micah/${currentUser.uid}.svg`
            }
            alt=""
          />
        </div>
        <div className={styles.info}>
          <h3>{userData.name}</h3>
          <p>{userData.branch}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        {peerData.map((peer) => {
          return <Peer setChatID={setChatID} peer={peer} profilePic={profilePics[peer.userID]} />;
        })}
        {peerData.length === 0 && <div className={styles.noPeers}>No peers yet</div>}
      </div>
    </div>
  );
}

export const Peer = ({ peer, profilePic, setChatID }) => {
  const history = useHistory();

  const handleClick = () => {
    console.log("opening this peer", peer)
    setChatID(peer.userID)
    // history.push(`/chat/${peer.userID}`)
  }
  
  return (
      <div onClick={handleClick} className={styles.peer}>
        <div className={styles.peerImg}>
          <img src={profilePic} alt="" />
        </div>
        <p>{peer.name}</p>
      </div>
  );
};