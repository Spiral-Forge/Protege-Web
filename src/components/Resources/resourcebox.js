import React, { useState } from 'react';
import './Resource.css';
import {db} from '../../firebase';

function Box(props) {
  const [myclass, setClass] = useState('');
  let[up, setUp]= useState('');
  let[down, setdown]= useState('');

  function divclicked() {
    if (myclass === '') {
      setClass('coolclass');
    } else {
      setClass('');
    }
  }
  function upVote(docId, votes){
    db.collection(props.id).doc(docId).update({upvote: votes+ 1})
    setUp(docId);
  }
  function downVote(docId, votes){
    db.collection(props.id).doc(docId).update({downvote: votes + 1})
    setdown(docId);
  }
  return (
  <div className="App" id="box">
    <h1 onClick={divclicked} className='BoxHeading'>{props.title.data().Title}</h1>
    <div class={`votes ${up==props.title.id? 'upvote' :''}`} 
      onClick={()=>{
        upVote(props.title.id, props.title.data().upvote)
      }}>
      <i class="fas fa-chevron-up"></i>
    </div>
    <div class={`votes ${down==props.title.id? 'downvote' :''}`} 
      onClick={()=>{
        downVote(props.title.id, props.title.data().downvote)}}>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div id="seconddiv" className={myclass}>
      <a href={props.link}> {props.link}</a>
    </div>
  </div>
  );
}
export default Box;
