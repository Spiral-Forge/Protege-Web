import { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import EditProfile from "./EditProfile";
import ProfileInfo from "./ProfileInfo";
import { BsPencil } from "react-icons/bs";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
export default function Profile() {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState();
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUserData(doc.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.container}>
      {userData && (
        <>
          <div className={styles.content}>
            {!edit ? (
              <>
                <div className={styles.head}>
                  <div className={styles.img}>
                    <img
                      src={
                        currentUser.photoUrl ||
                        `https://avatars.dicebear.com/api/micah/${currentUser.uid}.svg`
                      }
                      alt=""
                    />
                  </div>
                  <h2>{userData.name}</h2>
                  <h3>
                    <em>{userData.post}</em>
                  </h3>
                  <span onClick={() => setEdit(true)} className={styles.edit}>
                    <BsPencil /> <p>Edit Profile</p>
                  </span>
                </div>
                <ProfileInfo userData={userData} />
              </>
            ) : (
              <EditProfile
                userData={userData}
                setEdit={setEdit}
                setUserData={setUserData}
              />
            )}
          </div>
          <div className={styles.black} />
        </>
      )}
    </div>
  );
}
