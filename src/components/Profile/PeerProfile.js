import styles from "../../styles/Profile.module.css";
import ProfileInfo from "./ProfileInfo";
import { useAuth } from "../../context/AuthContext";

export default function PeerProfile({index}) {
    index = 0;
    const { currentUser, peerData } = useAuth();
    // const [peerData, setMyPeers] = useState();

    // useEffect(() => {
    //   console.log(myPeers);
    //     db.collection("users")
    //       .doc(myPeers[index])
    //       .get()
    //       .then((doc) => {
    //         setMyPeers(doc.data());
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }, []);

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
                      src={
                        currentUser.photoUrl ||
                        `https://avatars.dicebear.com/api/micah/${currentUser.uid}.svg`
                      }
                      alt=""
                    />
                  </div>
                  <h2>{peerData[index].name}</h2>
                  <h3>
                    <em>{peerData[index].post}</em>
                  </h3>
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
