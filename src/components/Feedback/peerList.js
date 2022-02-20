import styles from "../../styles/FeedbackList.module.css";
import { useAuth } from "../../context/AuthContext";

export default function PeerTiles({ setChatID }) {
  const { peerData, profilePics } = useAuth();
  return (
      <div className={styles.bottom}>
        {peerData.map((peer) => {
          return <Peer setChatID={setChatID} peer={peer} profilePic={profilePics[peer.userID]} />;
        })}
        {peerData.length === 0 && <div className={styles.noPeers}>No peers yet</div>}
      </div>

  );
}

export const Peer = ({ peer, profilePic, setChatID }) => {

  const handleClick = () => {
    console.log("opening this peer", peer)
    setChatID(peer.userID)
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