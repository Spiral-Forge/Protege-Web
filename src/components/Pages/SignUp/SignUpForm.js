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
function SignUpForm({ post, setPost }) {
  const history = useHistory();
  const { signUp } = useAuth();
  const [guidelinesPopUp, setGuidelinesPopUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    rollNo: "",
    linkedInURL: "",
    githubURL: "",
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
      await db.collection("Users").doc(auth.currentUser.uid).set(tempObject);
    } catch (e) {
      return console.log(e);
    }
    console.log(auth.currentUser.uid);
    setGuidelinesPopUp(false);
    history.push("/");
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
      photoURL: null,
      post,
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
      if (!data.phone) {
        throw "Phone";
      }
      if (isNaN(data.phone)) {
        window.alert("Phone number is inValid");
        return;
      }
      if (!data.password) {
        throw "Password";
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
      if (!data.rollNo) {
        throw "Roll";
      }
      if (!data.domains.length) {
        throw "Domains";
      }
      if (!data.languages.length) {
        throw "Languages";
      }
      if (!data.linkedInURL) {
        throw "LinkedIn";
      }
      if (!data.githubURL) {
        throw "Github";
      }
      if (!data.gender) {
        throw "Gender";
      }
      if (!data.hosteller?.toString()) {
        throw "Hosteller";
      }
    } catch (err) {
      // console.log(`${err} field is required`);
      window.alert(`${err} field is required`);
      return;
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
        <h1>
          Mentors, <br />
          Register and Start your Journey.
        </h1>
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
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
            <label htmlFor="rollNo">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="domain">Domains</label>
            <MultiSelect
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
              options={languagesArr}
              value={lang}
              onChange={setLang}
              labelledBy={"languages"}
              className="multi-select"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="linkedInURL">LinkedIn Id</label>
            <input
              type="text"
              name="linkedInURL"
              placeholder="LinkedIn Id"
              value={formData.linkedInURL}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="githubURL">Github Id</label>
            <input
              type="text"
              name="githubURL"
              placeholder="Github Id"
              value={formData.githubURL}
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
