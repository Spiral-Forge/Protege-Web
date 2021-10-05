import React, { useState } from "react";
import "./Resource.css";
function Box(props) {
  const [myclass, setClass] = useState("");

  function divclicked() {
    if (myclass === "") {
      setClass("coolclass");
    } else {
      setClass("");
    }
  }
  return (
    <div className="App">
      <div id="box">
      <h1 onClick={divclicked}>{props.title}</h1>
      <div id="seconddiv" className={myclass}>
        <a href={props.link}> {props.link}</a>
      </div>
      </div>
      </div>
  );
}
export default Box;
