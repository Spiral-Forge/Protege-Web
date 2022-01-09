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

  // useEffect((open) => {
  //   setOpen(open);
    useEffect(() => {
      setOpen(false);
  }, []);

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
                  <li className={styles.signup}>Signup</li>
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
              <Link to="/profile">
                <li>
                  <div>
                    <p>Nitasha Dhingra</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>
              { !currentUser && (
                <Link to="/home">
                  <li>
                    <div>
                      Home<AiOutlineRight />
                    </div>
                  </li>
                </Link>
              )}
              <Link to="/faqs" >
                <li>
                  <div>
                    <p>FAQs</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>
              <Link to="/vision">
                <li>
                  <div>
                    <p>Vision</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>

              
            </ul>
            <ul>
              { !currentUser && (
                  <Link to="/signin">
                    <li className={styles.moblogin}>
                        <p>Login</p>
                    </li>
                  </Link>
              )}

              { currentUser && (
                  <li className={styles.moblogin} onClick={handleSignOut}>
                      <p>Logout</p>
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
