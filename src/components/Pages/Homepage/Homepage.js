import React, { useState } from "react";
import "./Homepage.css";
import { Button } from "../../Navbar/Button";
import { Link } from "react-router-dom";
import img from "../../Navbar/Mentorship.jpg";
import { Fab } from "@mui/material";
import AddEvent from "./AddEvent";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../../context/AuthContext";
function Homepage() {
  const [addEventDialog, setAddEventDialog] = useState(false);
  const handleDialogOpen = () => {
    setAddEventDialog(true);
  };
  const { isMentor } = useAuth();
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
                <div className="top-line">Register as</div>
                <div>
                  <Link to="/mentorsignup">
                    <Button buttonSize="btn--large" buttonColor="blue">
                      Mentor
                    </Button>
                  </Link>{" "}
                  <Button buttonColor="white"></Button>
                  <Link to="/menteesignup">
                    <Button buttonSize="btn--large" buttonColor="blue">
                      Mentee
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt="alt" className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
        {isMentor && (
          <>
            <div className="floating-btn-container">
              <Fab
                style={{
                  backgroundColor: "rgba(48, 48, 48, 1)",
                  color: "white",
                }}
                aria-label="add"
                onClick={handleDialogOpen}
              >
                <AddIcon />
              </Fab>
            </div>

            <AddEvent
              setAddEventDialog={setAddEventDialog}
              addEventDialog={addEventDialog}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Homepage;
