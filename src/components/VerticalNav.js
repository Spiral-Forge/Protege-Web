import styles from "../styles/VerticalNav.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill, BsCalendarEventFill } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
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
          />
        </Link>
      </div>
      <div className={styles.icons}>
        <Link to="/">
          <AiFillHome className={styles.icon} />
        </Link>
        <Link to="/chat">
          <BsFillChatDotsFill className={styles.icon} />
        </Link>
        <Link to="/resources">
          <FaSwatchbook className={styles.icon} />
        </Link>
        <Link to="/deadlines">
          <BsCalendarEventFill className={styles.icon} />
        </Link>
      </div>
      <div className={styles.logout}>
        <FiLogOut onClick={()=> {setShowErrorMessage(true)}} className={styles.icon} />
      </div>
      <LogoutDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false) }/>
    </div>
  );
}
