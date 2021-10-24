import styles from "../../styles/Profile.module.css";
import {
  BsFillTelephoneFill,
  BsGlobe,
  BsCodeSlash,
  BsLinkedin,
} from "react-icons/bs";
import { IoMdMail, IoMdSchool } from "react-icons/io";
export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.img}>
            <img
              src="https://avatars.githubusercontent.com/u/44186440?v=4"
              alt=""
            />
          </div>
          <h2>Nitasha Dhingra</h2>
          <h3>
            <em>Admin</em>
          </h3>
        </div>
        <div className={styles.info}>
          <span className={styles.field}>
            <BsFillTelephoneFill className={styles.icon} />
            <div>
              <p>6296343307</p>
            </div>
          </span>
          <span className={styles.field}>
            <IoMdMail className={styles.icon} />
            <div>
              <p>coding.harshp@gmail.com</p>
            </div>
          </span>
          <span className={styles.field}>
            <IoMdSchool className={styles.icon} />
            <div>
              <p>Branch, year</p>
              <p>Roll number here</p>
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
              <a
                href="https://www.linkedin.com/in/harsh-kumar-pandey-5ab9071aa/"
                target="_blank"
              >
                https://www.linkedin.com/in/harsh-kumar-pandey-5ab9071aa/
              </a>
            </div>
          </span>
        </div>
      </div>
      <div className={styles.black} />
    </div>
  );
}
