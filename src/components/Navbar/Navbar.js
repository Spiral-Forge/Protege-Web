import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import './Navbar.css';
import {Button} from "./Button";
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    routeChange=()=> {
      let path = 'signin';
      this.props.history.push(path);
    }

  render() { 
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Protégé<i className="fab fa-react"></i></h1>
        <div className="menu-icon" onClick={this.handleClick}>
            <i className={this.state.clicked? 'fas fa-times': 'fas fa-bars'}>

            </i>
        </div>
        <ul className={this.state.clicked? 'nav-menu active' : 'nav-menu'
        }>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                    {item.title}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="nav-btn">
        <Button onClick={this.routeChange}>Sign In</Button>

        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar)
