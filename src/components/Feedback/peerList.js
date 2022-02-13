import styles from "../../styles/FeedbackList.module.css";
import styles1 from "../../styles/Resource.module.css";
import { useAuth } from "../../context/AuthContext";
import {  useHistory} from "react-router-dom";
export default function PeerTiles({ setChatID, peerData, profilePics }) {
  const { userData, currentUser } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
  
        <div className={styles.heading}>
          <h1>Feedback</h1>
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