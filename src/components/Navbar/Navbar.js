import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Button } from "./Button";
import { withRouter, Link } from "react-router-dom";
import logo from "./logo.jpg";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        <img src={logo} height="70px" />
      </h1>
      <div className="menu-icon">
        {/* <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i> */}
      </div>

      <ul className={"nav-menu"}>
        {MenuItems.map((item, index) => {
          if (currentUser && item.hideWhenLoggedIn) return null;
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
// class Navbar extends Component {
//   constuctor() {
//     this.routeChange = this.routeChange.bind(this);
//   }
//   state = { clicked: false };

//   handleClick = () => {
//     this.setState({ clicked: !this.state.clicked });
//   };

//   routeChange = () => {
//     let path = "signin";
//     this.props.history.push(path);
//   };
//   render() {}
// }

export default Navbar;
