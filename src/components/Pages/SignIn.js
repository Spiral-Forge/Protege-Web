
import React, { useEffect, useState } from "react";
import styles from "../../styles/Signin.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import ErrorDialog from "../ErrorDialog";

const SignIn = () => {

  const history = useHistory();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  const handleLogin = async () => {
    try {
      await signIn(formData.email, formData.password);
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found":
          setErrorMessage("This email address is not registered.");
          setShowErrorMessage(true);
          break;
        case "auth/wrong-password":
          setErrorMessage("Incorrect password. Try Again!");
          setShowErrorMessage(true);
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
      setErrorMessage(`${err} field is required.`);
      setShowErrorMessage(true);
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
    console.log(currentUser)
    if (currentUser && !currentUser.emailVerified) {
      auth.signOut();
      setErrorMessage("Please check your inbox and verify your email to sign in.")
      setShowErrorMessage(true);
    } else if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);
  
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
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
            <label htmlFor="check">Keep me logged in</label>
          </div>
        </div>
        <div className={styles.cta}>
          <button className="button-1">Login</button>
        </div>

        <p className={styles.route}>
          Don't have an account?
          <span>
            <Link to="/register"> Sign Up</Link>
          </span>
        </p>
      </form>
      
      <ErrorDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false)} errorMessage={errorMessage} />

      
    </div>
  );
};

export default SignIn;
