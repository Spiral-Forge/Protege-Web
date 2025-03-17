import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase";
import { MultiSelect } from "react-multi-select-component";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../../../App.css"
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
  getArray,
} from "./SignUpOptions";
import ErrorDialog from "../../ErrorDialog";
import { guidelinesMentors, guidelinesMentees } from "../staticPagesData";
import { useEffect } from "react";

function SignUpForm({ post, setPost }) {
  const history = useHistory();
  const { signUp } = useAuth();
  const [guidelinesPopUp, setGuidelinesPopUp] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    pwd: "",
    confirm_pwd: "",
    roll: "",
    linkedInUrl: "",
    githubUrl: "",
  });

  const [gender, setGender] = useState([]);
  const [college, setCollege] = useState([]);
  const [branch, setBranch] = useState([]);
  const [year, setYear] = useState([]);
  const [domain, setDomain] = useState([]);
  const [lang, setLang] = useState([]);

  const [genders, setGenders] = useState([]);
  const [collegesArr, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [domainsArr, setDomains] = useState([]);
  const [languagesArr, setLanguages] = useState([]);

  useEffect(() => {
    db.collection("constants")
      .doc("mIi9pu17P4u7TjWhqqrZ") // Fetch the correct document
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setGenders(data.genders || []);
          setLanguages(data.languages || []);
          setDomains(data.domains || []);
          setBranches(data.branches || []);
          setYears(data.years || []);
          setColleges(data.colleges || []);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => console.error("Error fetching Firestore data:", error));
  }, []);
  

  const handleAccept = async () => {
    try {
      await signUp(formData.email, formData.pwd); // Sign up user
  
      await auth.currentUser?.reload(); // Reload user to ensure it's up-to-date
      const user = auth.currentUser;
  
      if (user) {
        const tempObject = userObj();
        delete tempObject["pwd"];
        delete tempObject["confirm_pwd"];
        tempObject["token"] = user.uid;
  
        await db.collection("users").doc(user.uid).set(tempObject);
        await user.sendEmailVerification(); // Send verification email
        await auth.signOut(); // Log out the user
        setGuidelinesPopUp(false);
        setErrorMessage("Please check your inbox and verify your email to sign in.");
        setShowErrorMessage(true);
      } else {
        console.error("User not found after signup.");
      }
    } catch (e) {
      console.error("Error during signup:", e);
      if (e.code === "auth/email-already-in-use") {
        setGuidelinesPopUp(false);
        setErrorMessage("The email address is already in use by another account.");
        setShowErrorMessage(true);
      }
    }
  
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
      gender: gender,
      peerId: [],
      photoUrl: null,
      post,
      fcmToken: "",
      token: "",
      course: null,
      password: "",
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
        setErrorMessage("Phone number is inValid");
        setShowErrorMessage(true);
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
      setErrorMessage(`${err} field is required`);
      setShowErrorMessage(true);
      return false;
    }

    try {
      if (data.pwd != data.confirm_pwd) {
        throw "Passwords don't match.";
      }
      if (data.pwd.length < 6) {
        throw "Password must have atleast 6 characters";
      }
    } catch (err) {
      setErrorMessage(err);
      setShowErrorMessage(true);
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
        <button onClick={() => setPost("")} className="backbutton">
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
            <Dropdown options={genders} onChange={(selected) => setGender(selected.value)} placeholder="Select your Gender" />
          </div>
          <div className={styles.group}>
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              name="email"
              // placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="pwd"
              // placeholder="Password"
              value={formData.pwd}
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="confirm_pwd">Confirm Password</label>
            <input
              type="password"
              name="confirm_pwd"
              // placeholder="Confirm Password"
              value={formData.confirm_pwd}
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
              // placeholder="Roll Number"
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
              // placeholder="LinkedIn Id"
              value={formData.linkedInUrl}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="githubUrl">Github Profile Link</label>
            <input
              type="text"
              name="githubUrl"
              // placeholder="Github Id"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>

          {/* <div className={styles.group}>
            <label htmlFor="hosteller">Are you a hosteller?</label>
            <Dropdown
              options={hostellers}
              onChange={setHosteller}
              placeholder="Yes / No"
            />
          </div> */}
        </div>
        <div className={styles.cta}>
          <button className="button-1">SUBMIT</button>
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
      <ErrorDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false)} errorMessage={errorMessage} />
    </div>
  );
}

export default SignUpForm;
