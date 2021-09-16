import { TextField } from "@material-ui/core";

const SignUpFormPartTwo = ({ handleFormChange }) => {
  return (
    <>
      <h4>Select your branch</h4>
      <TextField
        name="branch"
        label="Pick Your Branch"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Select your year</h4>
      <TextField
        name="year"
        label="Current year of study"
        required
        onChange={handleFormChange}
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Roll Number</h4>
      <TextField
        name="rollNumber"
        label="Type your roll number here"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
      <h4>Are you a Hosteller?</h4>
      <TextField
        name="hosteller"
        label="Yes/No"
        onChange={handleFormChange}
        required
        style={{ marginBottom: 30, width: "35rem", marginLeft: "1rem" }}
      />
    </>
  );
};

export default SignUpFormPartTwo;
