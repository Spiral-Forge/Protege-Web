import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Button } from "./Button";
import { withRouter } from "react-router-dom";
import logo from "./logo.jpg";
class Navbar extends Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  routeChange = () => {
    let path = "signin";
    this.props.history.push(path);
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          <img src={logo} height="70px" />
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
          <li className="nav-btn" onClick={this.routeChange}>
            <a className={'nav-links'}> Sign In</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
