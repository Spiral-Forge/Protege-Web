import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase";
import "./SignUp.css";
import {
  branches,
  collegesArr,
  domainsArr,
  genders,
  languagesArr,
  years,
} from "./SignUpOptions";
function SignUpForm({ post, setPost }) {
  const history = useHistory();
  const { signUp } = useAuth();
  const [guidelinesPopUp, setGuidelinesPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    post: post,
    gender: genders[0],
    college: collegesArr[0],
    branch: branches[0],
    year: years[0],
    rollNo: "",
    domains: [],
    languages: [],
    linkedIn: "",
    githubURL: "",
    peerID: [],
    photoURL: null,
  });
  const handleAccept = async () => {
    try {
      await signUp(formData.email, formData.password);
      const tempObject = { ...formData };
      delete tempObject["password"];
      await db.collection("Users").doc(auth.currentUser.uid).set(tempObject);
    } catch (e) {
      return console.log(e);
    }
    console.log(auth.currentUser.uid);
    setGuidelinesPopUp(false);
    history.push("/");
  };
  const handleButtonClick = () => {
    if (isNaN(formData.phoneNumber)) {
      window.alert("Please enter a valid number");
      return;
    }
    if (
      formData["domains"].length === 0 ||
      formData["languages"].length === 0
    ) {
      window.alert("Please complete the form");
      return;
    }
    for (const prop in formData) {
      if (typeof formData[prop] === "string") {
        const val = formData[prop].trim();
        if (
          val === "" ||
          val === genders[0] ||
          val === collegesArr[0] ||
          val === branches[0] ||
          val === years[0]
        ) {
          window.alert("Please fill " + prop + " in the form");
          return;
        }
      }
    }
    setGuidelinesPopUp(true);
  };
  const handleGuidelinesClose = () => {
    setGuidelinesPopUp(false);
  };
  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div style={{ padding: "2rem 4rem" }}>
      <button
        className="sign-up-back-btn"
        onClick={() => {
          setPost("");
        }}
      >
        {" "}
        <img src="back-icon.svg" height='20px'/> Back
      </button>
      <h1 className="signup-heading">
        {post},
        <br />
        Register and Start your Journey.
      </h1>
      <div className="form-container">
        <div className="form-grid">
          <div className="gridItem">
            <h4 className="input-label">Name</h4>
            <TextField
              name="name"
              label={formData.name === "" && "Type your name here"}
              InputLabelProps={{ shrink: false }}
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div className="gridItem">
            <h4 className="input-label">Email Id</h4>
            <TextField
              name="email"
              label={formData.email === "" && "Type your email Id here"}
              onChange={handleFormDataChange}
              InputLabelProps={{ shrink: false }}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div className="gridItem">
            <h4 className="input-label">Phone Number</h4>
            <TextField
              name="phoneNumber"
              label={
                formData.phoneNumber === "" && "Type your phone number here"
              }
              InputLabelProps={{ shrink: false }}
              required
              onChange={handleFormDataChange}
              style={{ width: "20rem" }}
            />
          </div>

          <div className="gridItem">
            <h4 className="input-label">Password</h4>
            <TextField
              name="password"
              label={formData.password === "" && "Atleast 8 Characters"}
              InputLabelProps={{ shrink: false }}
              type="password"
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>

          <div className="gridItem">
            <h4 className="input-label select-label">College</h4>
            <FormControl style={{ width: "20rem" }}>
              <NativeSelect
                inputProps={{
                  name: "college",
                  id: "college",
                }}
                name="college"
                onChange={handleFormDataChange}
              >
                {collegesArr.map((college, index) => {
                  return (
                    <option key={index} value={college}>
                      {college}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div className="gridItem">
            <h4 className="input-label select-label">Select your branch</h4>
            <FormControl style={{ width: "20rem" }}>
              <NativeSelect
                inputProps={{
                  name: "branch",
                  id: "branch",
                }}
                name="branch"
                onChange={handleFormDataChange}
              >
                {branches.map((branch, index) => {
                  return (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div className="gridItem">
            <h4 className="input-label select-label">Select your year</h4>
            <FormControl style={{ width: "20rem" }}>
              <NativeSelect
                inputProps={{
                  name: "year",
                  id: "year",
                }}
                name="year"
                onChange={handleFormDataChange}
              >
                {years.map((year, index) => {
                  return (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </div>
          <div className="gridItem">
            <h4 className="input-label">Roll Number</h4>
            <TextField
              name="rollNo"
              label={formData.rollNo === "" && "Type your roll number here"}
              InputLabelProps={{ shrink: false }}
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>

          <div className="gridItem">
            <h4 className="input-label select-label">Select your domains</h4>
            <FormControl sx={{ mt: 1, width: 320 }}>
              <InputLabel id="multiple-domains-label">
                Select your domains
              </InputLabel>
              <Select
                fullWidth
                labelId="multiple-domains-label"
                id="multiple-domains"
                multiple
                value={formData.domains}
                name="domains"
                onChange={handleFormDataChange}
                input={<OutlinedInput label="Select your domains" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {domainsArr.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={formData.domains.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="gridItem">
            <h4 className="input-label select-label">Select your language</h4>
            <FormControl sx={{ mt: 1, width: 320 }}>
              <InputLabel id="multiple-lang-label">
                Select your Programming Languages
              </InputLabel>

              <Select
                labelId="multiple-lang-label"
                fullWidth
                id="multiple-lang"
                multiple
                value={formData.languages}
                name="languages"
                onChange={handleFormDataChange}
                input={
                  <OutlinedInput label="Select your Programming Languages" />
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {languagesArr.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={formData.languages.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="gridItem">
            <h4 className="input-label">LinkedIn Id</h4>
            <TextField
              name="linkedIn"
              label={formData.linkedIn === "" && "Type your LinkedIn here"}
              InputLabelProps={{ shrink: false }}
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div className="gridItem">
            <h4 className="input-label">Github Id</h4>
            <TextField
              name="githubURL"
              label={formData.githubURL === "" && "Type your Github Id here"}
              InputLabelProps={{ shrink: false }}
              onChange={handleFormDataChange}
              required
              style={{ width: "20rem" }}
            />
          </div>
          <div className="gridItem">
            <h4 className="input-label">Gender</h4>
            <FormControl style={{ width: "20rem" }}>
              <NativeSelect
                inputProps={{
                  name: "gender",
                  id: "gender",
                }}
                name="gender"
                onChange={handleFormDataChange}
              >
                {genders.map((gender) => {
                  return <option value={gender}>{gender}</option>;
                })}
              </NativeSelect>
            </FormControl>
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
          <Button onClick={handleAccept} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUpForm;
