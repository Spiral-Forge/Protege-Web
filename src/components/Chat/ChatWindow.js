import { useRef, useEffect } from "react";
import styles from "../../styles/ChatWindow.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";

const convo = [
  {
    comment: true,
    message: "Hi Urvi",
  },
  {
    comment: false,
    message: "Hello Nitasha",
  },
  {
    comment: true,
    message: "Whats up!!",
  },
  {
    comment: false,
    message: "nm",
  },
  {
    comment: true,
    message: "okay !",
  },
  {
    comment: false,
    message: "hmm",
  },
  {
    comment: true,
    message: "hmmm",
  },
  {
    comment: false,
    message: "hmmmmm",
  },
  {
    comment: false,
    message: "hmmmmmmmmmm",
  },
  {
    comment: true,
    message: "hmmmmmmmmm hmmmmmm",
  },
  {
    comment: true,
    message: "hmmmmmm hmmmmmmm hmmmmmm",
  },
  {
    comment: false,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iure in facere voluptas exercitationem aperiam. Blanditiis dolore officiis architecto perferendis eligendi. Nemo reiciendis debitis, facilis iusto suscipit ex! Inventore, cum.",
  },
  {
    comment: true,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritor sit amet consectetur adipisicing elit. Veritatis iure in facere voluptas exercitationem aperiam. Blanditiis dolore officiis architecto perferendis eligendi. Nemo reiciendis debitis, facilis iusto suscipit ex! Inventore, cum.",
  },
  {
    comment: false,
    message: "k bye",
  },
  {
    comment: true,
    message: "bye bye !",
  },
];

export default function ChatWindow({ chat, setChat }) {
  const scroll = useRef();

  useEffect(() => {
    scrollBottom();
  }, [chat]);

  const scrollBottom = () => {
    scroll.current.scrollIntoView();
  };

  return (
    <div className={`${styles.container} ${chat && `${styles.block}`} `}>
      <div className={styles.header}>
        <div onClick={() => setChat(false)} className={styles.back}>
          <IoMdArrowBack />
        </div>
        <div className={styles.peer}>
          <div className={styles.dpmob}>
            <img
              src="https://avatars.githubusercontent.com/u/44186440?v=4"
              alt=""
            />
          </div>
          <p>Nitasha Dhingra</p>
        </div>
      </div>
      <div className={styles.chat}>
        {convo.map((data) =>
          data.comment ? (
            <Comment message={data.message} />
          ) : (
            <Reply message={data.message} />
          )
        )}

        <div ref={scroll} style={{ backgroundColor: "black" }} />
      </div>
      <div className={styles.input}>
        <textarea rows={1} type="text" placeholder="Enter your message here" />
        <button>
          Send <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export const Comment = ({ message }) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.comment}>
        <div className={styles.dp}>
          <img
            src="https://avatars.githubusercontent.com/u/44186440?v=4"
            alt=""
          />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>6:56 PM</p>
        </div>
      </div>
    </div>
  );
};

export const Reply = ({ message }) => {
  return (
    <div className={styles.replyWrapper}>
      <div className={styles.reply}>
        <div className={styles.dp}>
          <img src="https://gcdn.pbrd.co/images/a32jYcov1Buc.png?o=1" alt="" />
        </div>
        <div className={styles.message}>
          <h5>{message}</h5>
          <p>7:00 PM</p>
        </div>
      </div>
    </div>
  );
};
