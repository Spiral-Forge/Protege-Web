import { TextField } from "@material-ui/core";

const SignUpFormPartOne = ({ handleFormChange }) => {
  return (
    <>
      <h4>Name</h4>
      <TextField
        name="name"
        label="Type your name here"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Phone Number</h4>
      <TextField
        name="phoneNumber"
        label="Type your phone number here"
        required
        onChange={handleFormChange}
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Email Id</h4>
      <TextField
        name="email"
        label="Type your email Id here"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Password</h4>
      <TextField
        name="password"
        label="Atleast 8 Characters"
        type="password"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
    </>
  );
};

export default SignUpFormPartOne;
