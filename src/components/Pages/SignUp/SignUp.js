import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import SignUpForm from "./SignUpForm";
const SignUp = () => {
  const [post, setPost] = useState("");
  return (
    <>
      {!post ? (
        <div className="choose-sign-up">
          <h1 className="signup-heading">Hey, <br />Register yourself as</h1> <br />
          <br />
          <div
            onClick={() => {
              setPost("Mentor");
            }}
            className="choose-sign-up-btn"
          >
            Mentor
          </div>
          or
          <div
            onClick={() => {
              setPost("Mentee");
            }}
            className="choose-sign-up-btn"
          >
            Mentee
          </div>
          <div className="choose-sign-up-already">
            Already registered? <Link to="/signin"> Sign in </Link>
          </div>
        </div>
      ) : (
        <SignUpForm post={post} setPost={setPost} />
      )}
    </>
  );
};

export default SignUp;
