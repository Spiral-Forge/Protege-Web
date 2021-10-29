import styles from "../../styles/Profile.module.css";
import {
  BsFillTelephoneFill,
  BsGlobe,
  BsCodeSlash,
  BsLinkedin,
} from "react-icons/bs";
import { IoMdMail, IoMdSchool } from "react-icons/io";

export default function ProfileInfo({ userData }) {
  return (
    <div className={styles.info}>
      <span className={styles.field}>
        <BsFillTelephoneFill className={styles.icon} />
        <div>
          <p>{userData.phone}</p>
        </div>
      </span>
      <span className={styles.field}>
        <IoMdMail className={styles.icon} />
        <div>
          <p>{userData.email}</p>
        </div>
      </span>
      <span className={styles.field}>
        <IoMdSchool className={styles.icon} />
        <div>
          <p>
            {userData.branch}, {userData.year} year, {userData.college}
          </p>
          <p>Roll number: {userData.rollNo}</p>
          <p>Hosteller: {userData.hosteller ? "Yes" : "No"}</p>
        </div>
      </span>
      <span className={styles.field}>
        <BsGlobe className={styles.icon} />
        <div>
          <p>Languages</p>
          <p>{userData.languages.join(", ")}</p>
        </div>
      </span>
      <span className={styles.field}>
        <BsCodeSlash className={styles.icon} />
        <div>
          <p>Domains</p>
          <p>{userData.domains.join(", ")}</p>
        </div>
      </span>
      <span className={styles.field}>
        <BsLinkedin style={{ fontSize: 50 }} className={styles.icon} />
        <div>
          <p>Linkedin</p>
          <a href={userData.linkedInURL} target="_blank">
            {userData.linkedInURL}
          </a>
        </div>
      </span>
    </div>
  );
}
