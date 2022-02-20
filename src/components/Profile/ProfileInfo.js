import styles from "../../styles/Profile.module.css";
import {
  BsFillTelephoneFill,
  BsGlobe,
  BsCodeSlash,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { IoMdMail, IoMdSchool } from "react-icons/io";

export default function ProfileInfo({ userData }) {
  return (
    <div className={styles.info}>
      <span className={styles.field}>
        <div className={styles.iconContainer}>
          <BsFillTelephoneFill className={styles.icon} />
        </div>
        <div>
          <p>{userData.phoneNo}</p>
        </div>
      </span>
      <span className={styles.field}>
        <div className={styles.iconContainer}>
          <IoMdMail className={styles.icon} />
        </div>
        <div>
          <p>{userData.email}</p>
        </div>
      </span>
      <span className={styles.field}>
        <div className={styles.iconContainer}>
          <IoMdSchool className={styles.icon} />
        </div>
        <div>
          <p>
            {userData.branch}, {userData.year} year, {userData.college}
          </p>
          <p>Roll number: {userData.roll}</p>
          {/* <p>Hosteller: {userData.hosteller ? "Yes" : "No"}</p> */}
        </div>
      </span>
      <span className={styles.field}>
        <div className={styles.iconContainer}>
          <BsGlobe className={styles.icon} />
        </div>
        <div>
          <p>Languages</p>
          <p>{userData.languages.join(", ")}</p>
        </div>
      </span>
      <span className={styles.field}>
        <div className={styles.iconContainer}>
          <BsCodeSlash className={styles.icon} />
        </div>
        <div>
          <p>Domains</p>
          <p>{userData.domains.join(", ")}</p>
        </div>
      </span>
      {userData.linkedInUrl != "" && <span className={styles.field}>
        <div className={styles.iconContainer}>
          <BsLinkedin className={styles.icon} />
        </div>
        <div>
          
          <a href={userData.linkedInUrl} target="_blank">
            <p>LinkedIn Profile</p>
          </a>
        </div>
      </span>}
      {userData.githubUrl != "" && <span className={styles.field}>
        <div className={styles.iconContainer}>
          <BsGithub className={styles.icon} />
        </div>
        <div>
          
          <a href={userData.githubUrl} target="_blank">
          <p>Github Profile</p>
          </a>
        </div>
      </span>}
    </div>
  );
}
