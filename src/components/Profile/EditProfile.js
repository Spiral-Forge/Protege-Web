import { useState } from "react";
import styles from "../../styles/EditProfile.module.css";
import { MultiSelect } from "react-multi-select-component";
import Dropdown from "react-dropdown";
import { branches, domainsArr, years } from "../Pages/SignUp/SignUpOptions";
export default function EditProfile({ setEdit }) {
  const [branch, setBranch] = useState([]);
  const [year, setYear] = useState([]);
  const [domain, setDomain] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <div className={styles.flex}>
          <input type="text" placeholder="Name" />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="Image Url" />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="Phone" />
        </div>
        <div className={styles.flex}>
          <Dropdown
            options={branches}
            onChange={setBranch}
            placeholder="Branch"
          />
        </div>
        <div className={styles.flex}>
          <Dropdown options={years} onChange={setYear} placeholder="Year" />
        </div>
        <div className={styles.flex}>
          <MultiSelect
            options={domainsArr}
            value={domain}
            onChange={setDomain}
            labelledBy="Domain"
            className="multi-select"
          />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="Roll Number" />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="LinkedIn Url" />
        </div>
        <div className={styles.flex}>
          <input type="text" placeholder="Github Url" />
        </div>
      </div>
      <div className={styles.cta}>
        <button onClick={() => setEdit(false)}>Cancel</button>
        <button>Update Profile</button>
      </div>
    </form>
  );
}
