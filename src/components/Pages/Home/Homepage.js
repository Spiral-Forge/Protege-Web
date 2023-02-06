import React from "react";
import img from "../../Navbar/Mentorship.jpg";
import Event from "./Event";
import cbLogo from "../../Navbar/coding_blocks.png";
import "./Homepage.css";
function Homepage() {
  return (
    <div>
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
                <p className="supported_by_cb">Supported By</p>
                <div className="cb_logo">
                  <img src={cbLogo} alt="alt" />
                </div>
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
    </div>
  );
}

export default Homepage;
