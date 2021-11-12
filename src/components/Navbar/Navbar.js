import React, { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MenuItems } from "./MenuItems";
import styles from "../../styles/Navbar.module.css";
import { Button } from "./Button";
import { withRouter, Link } from "react-router-dom";
import logo from "./logo.jpg";
import { useAuth } from "../../context/AuthContext";
import { Spiral as Hamburger } from "hamburger-react";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState();

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
            <Link to="/home">
              <li>Home</li>
            </Link>

            <Link to="/faqs">
              <li>FAQs</li>
            </Link>
            <Link to="/about">
              <li>About Us</li>
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
              <Link to="/home">
                <li>
                  <div>
                    <p>Nitasha Dhingra</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>
              <li>
                <div>
                  <p>Deadlines</p>
                  <p>
                    <AiOutlineRight />
                  </p>
                </div>
              </li>
              <Link to="/home">
                <li>
                  <div>
                    <p>Home</p>
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

              <Link to="/faqs">
                <li>
                  <div>
                    <p>FAQs</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>
              <Link to="/help">
                <li>
                  <div>
                    <p>Help Center</p>
                    <p>
                      <AiOutlineRight />
                    </p>
                  </div>
                </li>
              </Link>
              {/* <Link to="/signin">
                  <li>
                    <div >
                      <p>Login</p>
                      <p>
                        <AiOutlineRight />
                      </p>
                    </div>
                  </li>
                </Link> */}
            </ul>
            <ul>
              <Link to="/signin">
                <li className={styles.moblogin}>
                  <div>
                    <p>Login</p>
                  </div>
                </li>
              </Link>
              {/* <li className={styles.moblogin}>
                  <div>
                    <p>Logout</p>
                  </div>
                </li> */}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
