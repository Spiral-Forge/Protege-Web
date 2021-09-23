import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useState } from "react";
import { Button } from "../Navbar/Button";
import "./SignIn.css";
import { Link } from "react-router-dom";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });

  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    console.log(formData);
  };
  return (
    <div style={{ padding: "2rem 4rem" }}>
      <h1 className="signup-heading">
        Mentor,
        <br />
        Login and Start your Journey.
      </h1>
      <h3 className="signup-subheading">
        Mentor and Uplift others through you Journey
      </h3>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          marginTop: "4rem",
        }}
      >
        <h3>Your e-mail</h3>
        <TextField
          name="email"
          label="Type your email here"
          onChange={handleFormDataChange}
          required
          style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
        />
        <h3>Password</h3>
        <TextField
          name="password"
          type="password"
          label="At least 8 characters"
          onChange={handleFormDataChange}
          required
          style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              onChange={() => {
                setFormData({
                  ...formData,
                  ["keepLoggedIn"]: !formData.keepLoggedIn,
                });
              }}
            />
          }
          label="Keep me logged In"
          style={{ marginLeft: "0.5rem" }}
        />

        <button className="login-btn submit-btn " onClick={handleLogin}>
          Login
        </button>

        <div className='signup-link-container'>
          Don't have an account? <Link to="/register">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
