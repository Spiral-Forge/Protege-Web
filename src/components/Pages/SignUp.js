import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Button } from "../Navbar/Button";
import SignUpFormPartOne from "./SignUpForm/SignUpFormPartOne";
import SignUpFormPartThree from "./SignUpForm/SignUpFormPartThree";
import SignUpFormPartTwo from "./SignUpForm/SignUpFormPartTwo";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    branch: "",
    year: "",
    rollNumber: "",
    hosteller: "",
    domain: "",
    language: "",
    linkedIn: "",
    github: "",
  });
  const handleButtonClick = () => {
    if (signUpPartNumber === 3) {
      console.log(formData);
    } else setSignUpPart(signUpPartNumber + 1);
  };
  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [signUpPartNumber, setSignUpPart] = useState(1);
  return (
    <div style={{ padding: "2rem 4rem" }}>
      <h1>
        Mentee,
        <br />
        Register and Start your Journey.
      </h1>
      <h4>Learn and Uplift yourself throughout Journey</h4>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          marginTop: "4rem",
        }}
      >
        {signUpPartNumber === 1 && (
          <SignUpFormPartOne handleFormChange={handleFormDataChange} />
        )}
        {signUpPartNumber === 2 && (
          <SignUpFormPartTwo handleFormChange={handleFormDataChange} />
        )}
        {signUpPartNumber === 3 && (
          <SignUpFormPartThree handleFormChange={handleFormDataChange} />
        )}
      </div>
      <div
        className="btn-container"
        style={{ width: "25rem", margin: "0 auto", marginTop: "1rem" }}
      >
        <Button
          buttonSize="btn-wide"
          buttonColor="blue"
          onClick={handleButtonClick}
        >
          {signUpPartNumber === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
