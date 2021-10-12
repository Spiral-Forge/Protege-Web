import React from 'react';
import './ResourceCard.css'
import {
  Link,
} from "react-router-dom";
function Card(props) {
    return (
        <div class="rectangle1">
          <Link to={`/${props.heading}`} >
          <div className="resourceCard">
              <div className='rectangle2'>
                <img src={props.src} />
              </div>
              <h1 className='resourceheading'>{props.heading}</h1>
          </div>
          </Link>
      </div>
    );
  }
  
  export default Card;