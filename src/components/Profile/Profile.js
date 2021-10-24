import { useState } from "react";
import styles from "../../styles/Profile.module.css";
import EditProfile from "./EditProfile";
import ProfileInfo from "./ProfileInfo";
import { BsPencil } from "react-icons/bs";
export default function Profile() {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!edit ? (
          <>
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
              <span onClick={() => setEdit(true)} className={styles.edit}>
                <BsPencil /> <p>Edit Profile</p>
              </span>
            </div>
            <ProfileInfo />
          </>
        ) : (
          <EditProfile setEdit={setEdit} />
        )}
      </div>
      <div className={styles.black} />
    </div>
  );
}
