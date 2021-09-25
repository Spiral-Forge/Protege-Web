import React, { useState, useEffect } from "react";
import "./Resource.css";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import Box from "./ResourceBox";
function Resource() {
  let { id } = useParams();

  let [info, setInfo] = useState([]);
  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener("load", () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
    db.collection("Development")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  };
  function divclicked(event) {
    if (event.target.nodeName === "I") {
      event.target.classList.add("clicked", "inverted");
      setTimeout(function () {
        event.target.classList.remove("clicked", "inverted");
      }, 500);
    }
  }
  return (
    <div>
      <h1 className="SResourceHeading">{id} resources</h1>

      {info.map((resource) => {
        return (
          <div>
            <Box title={resource.Title} link={resource.Link} />
            <div class="widget " onClick={divclicked}>
              <div class="upvote thumbs">
                <i class="thumbs-icon thumbs-icon-up"></i>
              </div>
              <div class="downvote thumbs">
                <i class="thumbs-icon thumbs-icon-down"></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Resource;
