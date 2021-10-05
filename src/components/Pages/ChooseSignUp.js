import { Link } from "react-router-dom";

const ChooseSignUp = () => {
  return (
    <div className="choose-sign-up">
      <h1 className="signup-heading">Hey, Register yourself as</h1> <br />
      <br />
      <Link to="/register/mentor" className="choose-sign-up-btn">
        Mentor
      </Link>
      or
      <Link to="/register/mentee" className="choose-sign-up-btn">
        Mentee
      </Link>
      <div className="choose-sign-up-already">
        Already registered? <Link to="/signin"> Sign in </Link>
      </div>
    </div>
  );
};

export default ChooseSignUp;
