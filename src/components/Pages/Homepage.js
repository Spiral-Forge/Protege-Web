import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { Button } from "../Navbar/Button";
import { Link } from "react-router-dom";
import img from "../Navbar/Mentorship.jpg";
import Event from "./Event";
import { db } from "../../firebase";
function Homepage() {
  
  return (
    <>
      <div className="home__hero-section">
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <h1 className="heading dark">Protégé</h1>
                <p className="home__hero-subtitle dark">
                  Get Immersive Mentorship and Learning Experience
                </p>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt="alt" className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Event />
      </div>
    </>
  );
}

export default Homepage;
