import styles from "../../styles/Conversations.module.css";

export default function Conversations({ setChat }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.img}>
          <img src="https://gcdn.pbrd.co/images/a32jYcov1Buc.png?o=1" alt="" />
        </div>
        <div className={styles.info}>
          <h3>Urvi Goel</h3>
          <p>Computer Science Engineering</p>
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
        <img
          src="https://avatars.githubusercontent.com/u/44186440?v=4"
          alt=""
        />
        {active && <div className={styles.green} />}
      </div>

      <p>Nitasha Dhingra</p>
    </div>
  );
};
