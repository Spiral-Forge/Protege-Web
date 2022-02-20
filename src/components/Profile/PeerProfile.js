import styles from "../../styles/Profile.module.css";
import ProfileInfo from "./ProfileInfo";
import { useAuth } from "../../context/AuthContext";
import { IoMdArrowBack } from "react-icons/io";


export default function PeerProfile({index, setShowPeer}) {
  const { profilePics, peerData, myPeers } = useAuth();
  console.log("peers:",myPeers)
  console.log("pics:",profilePics)
  return (
    console.log(peerData),
    <div className={styles.container}>
      {peerData && (
        <>
          <div className={styles.content}>
            {
              <>
                <div className={styles.head}>
                  <div className={styles.img}>
                    <img
                      src={peerData["photoUrl"] || profilePics[myPeers[index]]}
                      alt=""
                    />
                  </div>
                  <h2>{peerData[index].name}</h2>
                  <h3>
                    <em>{peerData[index].post}</em>
                  </h3>
                  <span onClick={() => setShowPeer(false)} className={styles.edit}>
                    <IoMdArrowBack /><p>Chat</p>
                  </span>
                </div>
                { <ProfileInfo userData={peerData[index]} /> }
              </>
            }
          </div>
          <div className={styles.black} />
        </>
      )}
    </div>
    );
        }
