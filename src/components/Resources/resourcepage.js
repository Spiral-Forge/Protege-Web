import React from 'react';
import './Resource.css'
import {
    useParams
  } from "react-router-dom";
import Box from "./resourcebox";
function Resource() {
    let { id } = useParams();
   
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
           
            {
                // props.links.map((resource) =>{
                //     return(<div>
                //         <Box title ="abc" link="{resource.link}"/>
                //         <div class="widget " onClick={divclicked}>
                //             <div class="upvote thumbs">
                //                 <i class="thumbs-icon thumbs-icon-up"></i>
                //             </div>
                //             <div class="downvote thumbs">
                //                 <i class="thumbs-icon thumbs-icon-down"></i>
                //             </div>
                //             </div>
                //         </div>);
                // })

            }
            
        </div>
    );
  }
  
  export default Resource;