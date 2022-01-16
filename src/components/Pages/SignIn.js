import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useEffect, useState } from "react";
import { Button } from "../Navbar/Button";
import styles from "../../styles/Signin.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../../firebase";
const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const handleLogin = async () => {
    try {
      await signIn(formData.email, formData.password);
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found":
          window.alert("This email address is not registered.");
          break;
        case "auth/wrong-password":
          window.alert("Incorrect password");
          break;
      }
    }
  };
  const validate = (e) => {
    e.preventDefault();

    try {
      if (!formData.email) {
        throw "Email";
      }
      if (!formData.password) {
        throw "Password";
      }
    } catch (err) {
      // console.log(`${err} field is required`);
      window.alert(`${err} field is required`);
      return;
    }
    handleLogin();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser && !currentUser.emailVerified) {
      auth.signOut();
      setVerifyModal(true);
    } else if (currentUser) {
      history.push("/home");
    }
  }, [currentUser]);
  const [verifyModal, setVerifyModal] = useState(location.state?.verify);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>
          Login and <br />
          Start your Journey.
        </h1>
        <p>Upskill and uplift others</p>
      </div>

      <form onSubmit={validate} className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.group}>
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.check}>
            <input
              type="checkbox"
              checked={check}
              onChange={() => setCheck(!check)}
              name="check"
            />
            <label htmlFor="check">Keep me logged In</label>
          </div>
        </div>
        <div className={styles.cta}>
          <button>SUBMIT</button>
        </div>

        <p className={styles.route}>
          Don't have an account?
          <span>
            <Link to="/register"> Sign Up</Link>
          </span>
        </p>
      </form>
      <Dialog
        open={verifyModal}
        onClose={() => {
          setVerifyModal(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Email not verified!"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check your inbox and verify your email to sign in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setVerifyModal(false);
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignIn;
