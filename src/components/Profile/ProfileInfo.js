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
          <p>Branch, year</p>
          <p>Roll number {userData.rollNo}</p>
          <p>Hosteller: Yes/No</p>
        </div>
      </span>
      <span className={styles.field}>
        <BsGlobe className={styles.icon} />
        <div>
          <p>Language</p>
          <p>java, CPP</p>
        </div>
      </span>
      <span className={styles.field}>
        <BsCodeSlash className={styles.icon} />
        <div>
          <p>Domains</p>
          <p>Web, Machine Learning</p>
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
