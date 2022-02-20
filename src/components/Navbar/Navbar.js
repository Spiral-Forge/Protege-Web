import React, { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import styles from "../../styles/Navbar.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spiral as Hamburger } from "hamburger-react";
import LogoutDialog from "../LogoutDialog";
import Button from '@mui/material/Button';

const Navbar = () => {
  const { currentUser, userData, signOut } = useAuth();
  const [isOpen, setOpen] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.web}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/Spiral-Forge/Protege-Web/master/src/components/Navbar/logo.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.navlinks}>
          <ul>
            {!currentUser && (
              <Link to="/">
                <li>Home</li>
              </Link>
            )}

            <Link to="/faqs">
              <li>FAQs</li>
            </Link>

            <Link to="/vision">
              <li>Vision</li>
            </Link>
            {!currentUser && (
              <>
                <Link to="/signin">
                  <li className={styles.login}>Login</li>
                </Link>
                <Link to="/register">
                  <li className={styles.signup}>Sign up</li>
                </Link>
              </>
            )}

            {/* <li className={styles.logout}>Logout</li> */}
          </ul>
        </div>
      </nav>

      <nav className={styles.mob}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/Spiral-Forge/Protege-Web/master/src/components/Navbar/logo.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.menu}>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={27}
            color="black"
            rounded
          />
        </div>

        {isOpen && (
          <div className={styles.moblinksContainer}>
            <div className={styles.moblinks}>
              <ul>
                {currentUser && (
                  <Link to="/profile">
                    <li>
                      <div onClick={handleToggle}>
                        {userData.name}
                        <AiOutlineRight />
                      </div>
                    </li>
                  </Link>
                )}
                {!currentUser && (
                  <Link to="/">
                    <li>
                      <div onClick={handleToggle}>
                        Home
                        <AiOutlineRight />
                      </div>
                    </li>
                  </Link>
                )}
                <Link to="/faqs">
                  <li>
                    <div onClick={handleToggle}>
                      FAQs
                      <AiOutlineRight />
                    </div>
                  </li>
                </Link>

                <Link to="/vision">
                  <li>
                    <div onClick={handleToggle}>
                      Vision
                      <AiOutlineRight />
                    </div>
                  </li>
                </Link>
              </ul>
              <ul>
                {!currentUser && (
                  <Link to="/signin">
                    <li className={styles.moblogin}>
                      <Button className={styles.logoutButton} onClick={handleToggle}>Login</Button>
                    </li>
                  </Link>
                )}

                {currentUser && (
                  <li className={styles.moblogin} onClick={() => setShowErrorMessage(true)}>
                    <Button className={styles.logoutButton} onClick={handleToggle}>Log out</Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
      <LogoutDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false) }/>

    </div>
  );
};

export default Navbar;
