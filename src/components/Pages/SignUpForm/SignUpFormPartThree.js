import { TextField } from "@material-ui/core";

const SignUpFormPartThree = ({ handleFormChange }) => {
  return (
    <>
      <h4>Select your domains</h4>
      <TextField
        name="domain"
        label="Domains"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Select your language</h4>
      <TextField
        name="language"
        label="Languages"
        required
        onChange={handleFormChange}
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>LinkedIn Id</h4>
      <TextField
        name="linkedIn"
        label="Type your LinkedIn here"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Github</h4>
      <TextField
        name="github"
        label="Type your Github Id here"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
    </>
  );
};

export default SignUpFormPartThree;
