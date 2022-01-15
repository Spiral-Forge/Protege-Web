import styles from "../../styles/Conversations.module.css";
import { useAuth } from "../../context/AuthContext";
export default function Conversations({ setChat }) {
  const { userData, currentUser } = useAuth();
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
        <Peer active setChat={setChat} />
        <Peer active setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
        <Peer setChat={setChat} />
      </div>
    </div>
  );
}

export const Peer = ({ active, setChat }) => {
  return (
    <div onClick={() => setChat(true)} className={styles.peer}>
      <div className={styles.peerImg}>
        <img src="https://gcdn.pbrd.co/images/NLhKZ0n35MHv.jpg?o=1" alt="" />
        {active && <div className={styles.green} />}
      </div>

      <p>Harsh Pandey</p>
    </div>
  );
};
