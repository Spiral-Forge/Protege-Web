import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase";
import { MultiSelect } from "react-multi-select-component";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "../../../styles/Signup.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  branches,
  collegesArr,
  domainsArr,
  genders,
  languagesArr,
  years,
  hostellers,
  getArray,
} from "./SignUpOptions";

import { guidelinesMentors, guidelinesMentees } from "../staticPagesData";

function SignUpForm({ post, setPost }) {
  const history = useHistory();
  const { signUp } = useAuth();
  const [guidelinesPopUp, setGuidelinesPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    confirm_password: "",
    roll: "",
    linkedInUrl: "",
    githubUrl: "",
  });

  const [hosteller, setHosteller] = useState([]);
  const [gender, setGender] = useState([]);
  const [college, setCollege] = useState([]);
  const [branch, setBranch] = useState([]);
  const [year, setYear] = useState([]);
  const [domain, setDomain] = useState([]);
  const [lang, setLang] = useState([]);

  const handleAccept = async () => {
    try {
      await signUp(formData.email, formData.password);
      const tempObject = userObj();
      delete tempObject["password"];
      delete tempObject["confirm_password"];

      await db.collection("users").doc(auth.currentUser.uid).set(tempObject);
      await auth.currentUser.sendEmailVerification();
      await auth.signOut();
    } catch (e) {
      if (e.code == "auth/email-already-in-use") {
        window.alert("The email address is already in use by another account.");
      }
    }
    setGuidelinesPopUp(false);
    history.push({
      pathname: "/signin",
      state: { verify: true },
    });
  };

  const userObj = () => {
    const obj = {
      ...formData,
      domains: getArray(domain),
      languages: getArray(lang),
      year: year.value,
      branch: branch.value,
      college: college.value,
      gender: gender.value,
      hosteller: hosteller.value,
      peerID: [],
      photoUrl: null,
      post,
      fcmToken: "",
    };
    return obj;
  };

  const validate = (e) => {
    e.preventDefault();
    const data = userObj();
    try {
      if (!data.name) {
        throw "Name";
      }
      if (!data.email) {
        throw "Email";
      }
      if (!data.phoneNo) {
        throw "Phone Number";
      }
      if (isNaN(data.phoneNo)) {
        window.alert("Phone number is inValid");
        return;
      }
      if (!data.college) {
        throw "College";
      }
      if (!data.branch) {
        throw "Branch";
      }
      if (!data.year) {
        throw "Year";
      }
      if (!data.roll) {
        throw "Roll";
      }
      if (!data.domains.length) {
        throw "Domains";
      }
      if (!data.languages.length) {
        throw "Languages";
      }
    } catch (err) {
      window.alert(`${err} field is required`);
      return false;
    }

    try {
      if (data.password != data.confirm_password) {
        throw "Passwords don't match.";
      }
      if (data.password.length < 6) {
        throw "Password must have atleast 6 characters";
      }
    } catch (err) {
      window.alert(err);
      return false;
    }
    setGuidelinesPopUp(true);
  };

  const handleGuidelinesClose = () => {
    setGuidelinesPopUp(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Register and Start your Journey.</h1>
        {/* <p>Mentor and Uplift others through your Journey</p> */}
      </div>

      <form onSubmit={validate} className={styles.form}>
        <button onClick={() => setPost("")} className={styles.back}>
          {" "}
          <IoMdArrowRoundBack /> Back
        </button>

        <div className={styles.inputs}>
          <div className={styles.group}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="Contact Info"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="gender">Gender</label>
            <Dropdown
              options={genders}
              onChange={setGender}
              placeholder="Select your Gender"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="college">College</label>
            <Dropdown
              options={collegesArr}
              onChange={setCollege}
              placeholder="Select an option"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="branch">Branch</label>
            <Dropdown
              options={branches}
              onChange={setBranch}
              placeholder="Select an option"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="year">Year</label>
            <Dropdown
              options={years}
              onChange={setYear}
              placeholder="Select an option"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="roll">Roll Number</label>
            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={formData.roll}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="domain">Domains</label>
            <MultiSelect
              hasSelectAll={false}
              options={domainsArr}
              value={domain}
              onChange={setDomain}
              labelledBy={"domains"}
              className="multi-select"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="lang">Languages</label>
            <MultiSelect
              hasSelectAll={false}
              options={languagesArr}
              value={lang}
              onChange={setLang}
              labelledBy={"languages"}
              className="multi-select"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="linkedInUrl">LinkedIn Profile Link</label>
            <input
              type="text"
              name="linkedInUrl"
              placeholder="LinkedIn Id"
              value={formData.linkedInUrl}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="githubUrl">Github Profile Link</label>
            <input
              type="text"
              name="githubUrl"
              placeholder="Github Id"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="hosteller">Are you a hosteller?</label>
            <Dropdown
              options={hostellers}
              onChange={setHosteller}
              placeholder="Yes / No"
            />
          </div>
        </div>
        <div className={styles.cta}>
          <button>SUBMIT</button>
        </div>
      </form>
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
            {post === "Mentor" ? (
              <ol>
                {guidelinesMentors.map((guideline) => {
                  return <li>{guideline}</li>;
                })}
              </ol>
            ) : (
              <ol>
                {guidelinesMentees.map((guideline) => {
                  return <li>{guideline}</li>;
                })}
              </ol>
            )}
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
