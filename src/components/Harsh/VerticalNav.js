import styles from "../../styles/VerticalNav.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill, BsCalendarEventFill } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";

export default function VerticalNav() {
  return (
    <div className={styles.container}>
      <div className={styles.pic}>
        <img
          src="https://avatars.githubusercontent.com/u/44186440?v=4"
          alt=""
        />
      </div>
      <div className={styles.icons}>
        <AiFillHome className={styles.icon} />
        <BsFillChatDotsFill className={styles.icon} />
        <FaSwatchbook className={styles.icon} />
        <BsCalendarEventFill className={styles.icon} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FiLogOut className={styles.icon} />
      </div>
    </div>
  );
}
