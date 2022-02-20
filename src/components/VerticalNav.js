import styles from "../styles/VerticalNav.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill, BsCalendarEventFill } from "react-icons/bs";
import { SiBuzzfeed} from "react-icons/si";
import { VscFeedback} from "react-icons/vsc";
import { FaSwatchbook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import LogoutDialog from "./LogoutDialog"

export default function VerticalNav() {

  const { currentUser } = useAuth();
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  return (
    
    <div className={styles.container}>
      <div className={styles.pic}>
        <Link to="/profile">
          <img
            src={
              currentUser.photoUrl ||
              `https://avatars.dicebear.com/api/micah/${currentUser.uid}.svg`
            }
            alt=""
          /> <div className={styles.iconlabel}>View Profile</div>
        </Link>
      </div>
      <div className={styles.icons}>
        <Link className={styles.icon} to="/" >
          <AiFillHome className={styles.iconlogo} />
          <div className={styles.iconlabel}>Home</div>
        </Link>
        <Link className={styles.icon} to="/chat">
          <BsFillChatDotsFill className={styles.iconlogo} /><div className={styles.iconlabel}>Chat</div>
        </Link>
        <Link className={styles.icon} to="/resources">
          <FaSwatchbook className={styles.iconlogo} /><div className={styles.iconlabel}>Resources</div>
        </Link>
        <Link className={styles.icon} to="/deadlines">
          <BsCalendarEventFill className={styles.iconlogo} /><div className={styles.iconlabel}>Opportunities</div>
        </Link>
        <Link className={styles.icon} to="/feedback">
          <VscFeedback className={styles.iconlogo} /><div className={styles.iconlabel}>Feedback</div>
        </Link>
      </div>
      <div onClick={()=> {setShowErrorMessage(true)}} className={styles.logout}>
        <FiLogOut className={styles.iconlogo} /><div className={styles.iconlabel}>Logout</div>
      </div>
      <LogoutDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false) }/>
    </div>
  );
}
