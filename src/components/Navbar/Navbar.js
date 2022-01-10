import React, { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MenuItems } from "./MenuItems";
import styles from "../../styles/Navbar.module.css";
import { Button } from "./Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spiral as Hamburger } from "hamburger-react";

const Navbar = () => {

  const { currentUser, signOut } = useAuth();
  const history = useHistory();
  const [isOpen, setOpen] = useState();

  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
    history.push("/home");
  };

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
              <Link to="/home">
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
          <div className={styles.moblinks}>
            <ul>
            { currentUser && (
                <Link to="/profile">
                  <li>
                    <div onClick={handleToggle}>
                      USER NAME<AiOutlineRight />
                    </div>
                  </li>
                </Link>
              )}
              { !currentUser && (
                <Link to="/home">
                  <li>
                    <div onClick={handleToggle}>
                      Home<AiOutlineRight />
                    </div>
                  </li>
                </Link>
              )}
              <Link to="/faqs">
                <li>
                  <div onClick={handleToggle}>
                    FAQs<AiOutlineRight />
                  </div>
                </li>
              </Link>
              
              <Link to="/vision">
                <li>
                  <div onClick={handleToggle}>
                    Vision<AiOutlineRight />
                  </div>
                </li>
              </Link>

              
            </ul>
            <ul>
              { !currentUser && (
                  <Link to="/signin">
                    <li className={styles.moblogin}>
                        <p onClick={handleToggle}>Login</p>
                    </li>
                  </Link>
              )}

              { currentUser && (
                  <li className={styles.moblogin} onClick={handleSignOut}>
                      <p onClick={handleToggle}>Logout</p>
                  </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
