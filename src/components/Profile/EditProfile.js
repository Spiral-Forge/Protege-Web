import { useEffect, useRef, useState } from "react";
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
export default function EditProfile({ setEdit, userData, setUserData }) {
  const { currentUser } = useAuth();
  const imageInputRef = useRef(null);
  const [branch, setBranch] = useState({
    label: userData.branch,
    value: userData.branch,
  });
  const [year, setYear] = useState({
    label: userData.year,
    value: userData.year,
  });
  const [domain, setDomain] = useState(
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
      domains: getArray(domain),
    };
    if (validate(tempObj)) {
      await uploadImage();
      db.collection("Users").doc(currentUser.uid).set(tempObj);
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
      photoURL: url,
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
      if (!data.phone) {
        throw "Phone";
      }
      if (isNaN(data.phone)) {
        window.alert("Phone number is inValid");
        return;
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
      if (!data.gender) {
        throw "Gender";
      }
    } catch (err) {
      window.alert(`${err} field is required`);
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
            placeholder="Name"
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
            name="photo"
            style={{ border: "none" }}
            accept="image/png, image/jpeg"
          />
        </div>
        <div className={styles.flex}>
          <label> Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            defaultValue={newFormData.phone}
            name="phone"
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
            value={domain}
            onChange={setDomain}
            labelledBy="Domain"
            className="multi-select"
          />
        </div>
        <div className={styles.flex}>
          <label> Roll No:</label>

          <input
            type="text"
            placeholder="Roll Number"
            defaultValue={newFormData.rollNo}
            name="rollNo"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label> LinkedIn:</label>

          <input
            type="text"
            placeholder="LinkedIn Url"
            defaultValue={newFormData.linkedInURL}
            name="linkedInURL"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.flex}>
          <label> Github:</label>

          <input
            type="text"
            placeholder="Github Url"
            defaultValue={newFormData.githubURL}
            name="githubURL"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className={styles.cta}>
        <button onClick={() => setEdit(false)}>Cancel</button>
        <button>Update Profile</button>
      </div>
    </form>
  );
}
