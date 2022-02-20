import { useRef, useState } from "react";
import styles from "../../styles/EditProfile.module.css";
import { MultiSelect } from "react-multi-select-component";
import Dropdown from "react-dropdown";
import { ProfilePicStorageRef } from "../../firebase";
import {
  branches,
  domainsArr,
  years,
  getArray,
  languagesArr,
} from "../Pages/SignUp/SignUpOptions";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import ErrorDialog from "../ErrorDialog";
import "../../App.css"

export default function EditProfile({ setEdit, userData, setUserData }) {
  const { currentUser } = useAuth();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const imageInputRef = useRef(null);
  const [branch, setBranch] = useState({
    label: userData.branch,
    value: userData.branch,
  });
  const [year, setYear] = useState({
    label: userData.year,
    value: userData.year,
  });
  const [domains, setDomain] = useState(
    userData.domains.map((dom) => {
      return { label: dom, value: dom };
    })
  );
  const [languages, setLanguages] = useState(
    userData.languages.map((lang) => {
      return { label: lang, value: lang };
    })
  );

  let newFormData = { ...userData };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempObj = {
      ...newFormData,
      branch: branch.value,
      year: year.value,
      languages: getArray(languages),
      domains: getArray(domains),
    };
    if (validate(tempObj)) {
      await uploadImage();
      db.collection("users").doc(currentUser.uid).set(tempObj);
      setUserData(tempObj);
      setEdit(false);
    }
  };

  const uploadImage = async () => {
    if (imageInputRef.current.files.length === 0) return;
    const file = imageInputRef.current.files[0];
    const fileRef = ProfilePicStorageRef.child(currentUser.uid);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    await currentUser.updateProfile({
      photoUrl: url,
    });
  };

  const validate = (data) => {
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
    return true;
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    newFormData[name] = value;
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <div className={styles.flex}>
          <label> Name:</label>
          <input
            type="text"
            // placeholder="Name"
            defaultValue={newFormData.name}
            name="name"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label>Image:</label>
          <input
            ref={imageInputRef}
            type="file"
            placeholder="Image Url"
            name="photoUrl"
            style={{ border: "none" }}
            accept="image/png, image/jpeg"
          />
        </div>
        <div className={styles.flex}>
          <label> Phone Number:</label>
          <input
            type="text"
            // placeholder="Contact Info"
            defaultValue={newFormData.phoneNo}
            name="phoneNo"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label> Branch:</label>
          <Dropdown
            options={branches}
            onChange={setBranch}
            placeholder="Branch"
            value={newFormData.branch}
          />
        </div>
        <div className={styles.flex}>
          <label>Year:</label>
          <Dropdown
            options={years}
            onChange={setYear}
            value={year}
            placeholder="Year"
          />
        </div>
        <div className={styles.flex}>
          <label> Languages:</label>
          <MultiSelect
            options={languagesArr}
            value={languages}
            onChange={setLanguages}
            labelledBy="Languages"
            className="multi-select"
          />
        </div>
        <div className={styles.flex}>
          <label> Domains:</label>

          <MultiSelect
            options={domainsArr}
            value={domains}
            onChange={setDomain}
            labelledBy="Domain"
            className="multi-select"
          />
        </div>
        <div className={styles.flex}>
          <label> Roll No:</label>

          <input
            type="text"
            // placeholder="Roll Number"
            defaultValue={newFormData.roll}
            name="roll"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label> LinkedIn Profile Link:</label>

          <input
            type="text"
            // placeholder="Profile Link"
            defaultValue={newFormData.linkedInUrl}
            name="linkedInUrl"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label> Github Profile Link:</label>

          <input
            type="text"
            // placeholder="Profile Link"
            defaultValue={newFormData.githubUrl}
            name="githubUrl"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className={styles.cta}>
        <button onClick={() => setEdit(false)} className="button-2">Cancel</button>
        <button className="button-1">Update Profile</button>
      </div>
      <ErrorDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false)} errorMessage={errorMessage} />
    </form>
    
  );
}
