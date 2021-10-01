import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import "./SignUp.css";
function SignUp() {
  const { signUp, currentUser } = useAuth();
  const [guidelinesPopUp, setGuidelinesPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    branch: "CSE",
    year: "1",
    rollNo: "",
    hosteller: "",
    domains: [],
    languages: [],
    linkedIn: "",
    githubURL: "",
  });
  const handleButtonClick = async () => {
    // registration functionality here
    // console.log(formData);
    try {
      await signUp(formData.email, formData.password);
      await db.collection("Users").doc(auth.currentUser.uid).set(formData);
    } catch (e) {
      return console.log(e);
    }
    console.log(auth.currentUser.uid);
    setGuidelinesPopUp(true);
  };
  const handleGuidelinesClose = () => {
    setGuidelinesPopUp(false);
  };
  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const branches = ["CSE", "ECE"];
  const languagesArr = ["C++", "Python", "Java"];
  const domainsArr = [
    "Competitive Programming",
    "Machine Learning",
    "App Development",
    "Web Development",
    "IOT",
    "BlockChain",
    "Open Source",
    "No Prefence",
  ];
  return (
    <div style={{ padding: "2rem 4rem" }}>
      <h1 className="signup-heading">
        Mentor,
        <br />
        Register and Start your Journey.
      </h1>
      <h4 className="signup-subheading">
        Mentor and Uplift others through your Journey
      </h4>
      <div className="form-container">
        <div className="form-grid">
          <div className="gridItem">
            <h4 className="input-label">Name</h4>
            <TextField
              name="name"
              label="Type your name here"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Email Id</h4>
            <TextField
              name="email"
              label="Type your email Id here"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Phone Number</h4>
            <TextField
              name="phoneNumber"
              label="Type your phone number here"
              required
              onChange={handleFormDataChange}
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Password</h4>
            <TextField
              name="password"
              label="Atleast 8 Characters"
              type="password"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div className="gridItem">
            <h4 className="input-label select-label">Select your branch</h4>
            <FormControl fullWidth>
              <NativeSelect
                // defaultValue={"Branch"}
                inputProps={{
                  name: "branch",
                  id: "branch",
                }}
                name="branch"
                onChange={handleFormDataChange}
              >
                {branches.map((branch) => {
                  return <option value={branch}>{branch}</option>;
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div className="gridItem">
            <h4 className="input-label select-label">Select your year</h4>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue={"1"}
                inputProps={{
                  name: "year",
                  id: "year",
                }}
                name="year"
                onChange={handleFormDataChange}
              >
                {[1, 2, 3, 4].map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div>
            <h4 className="input-label">Roll Number</h4>
            <TextField
              name="rollNo"
              label="Type your roll number here"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Are you a Hosteller?</h4>
            <TextField
              name="hosteller"
              label="Yes/No"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Select your domains</h4>
            <FormControl sx={{ mt: 1, width: 320 }}>
              <Select
                fullWidth
                id="multiple-domains"
                multiple
                value={formData.domains}
                name="domains"
                onChange={handleFormDataChange}
                input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
              >
                {domainsArr.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <h4 className="input-label">Select your language</h4>
            <FormControl sx={{ mt: 1, width: 320 }}>
              <Select
                fullWidth
                id="multiple-lang"
                multiple
                value={formData.languages}
                name="languages"
                onChange={handleFormDataChange}
                input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
              >
                {languagesArr.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <h4 className="input-label">LinkedIn Id</h4>
            <TextField
              name="linkedIn"
              label="Type your LinkedIn here"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div>
            <h4 className="input-label">Github Id</h4>
            <TextField
              name="githubURL"
              label="Type your Github Id here"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
        </div>
        <button
          onClick={handleButtonClick}
          className="submit-btn form-submit-btn"
        >
          SUBMIT
        </button>
      </div>
      <Dialog
        open={guidelinesPopUp}
        onClose={handleGuidelinesClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registration Guidelines"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
            sit amet luctus venenatis lectus magna fringilla urna. Ipsum dolor
            sit amet consectetur adipiscing elit ut aliquam. Id cursus metus
            aliquam eleifend. Quisque egestas diam in arcu. Bibendum neque
            egestas congue quisque egestas. Aenean sed adipiscing diam donec
            adipiscing tristique risus. Phasellus vestibulum lorem sed risus.
            Fermentum dui faucibus in ornare quam viverra orci sagittis. Donec
            et odio pellentesque diam volutpat commodo sed. Amet aliquam id diam
            maecenas. Purus gravida quis blandit turpis cursus in. Dui ut ornare
            lectus sit amet. At quis risus sed vulputate odio. Enim nunc
            faucibus a pellentesque sit amet. At quis risus sed vulputate odio
            ut enim blandit volutpat. Eros in cursus turpis massa tincidunt dui.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGuidelinesClose}>Disagree</Button>
          <Button onClick={handleGuidelinesClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;
