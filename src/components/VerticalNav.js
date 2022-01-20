import styles from "../styles/VerticalNav.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill, BsCalendarEventFill } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export default function VerticalNav() {

  const { currentUser, signOut } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [verifyModal, setVerifyModal] = useState(location.state?.verify);



  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
    history.push("/home");
  };

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
        <Link to="/home">
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
        <FiLogOut onClick={()=> {setVerifyModal(true)}} className={styles.icon} />
      </div>
      <Dialog
        open={verifyModal}
        onClose={() => {
          setVerifyModal(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
              onClick={() => {
                setVerifyModal(false);
              }}>
              No
          </Button>
          <Button onClick={handleSignOut} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
