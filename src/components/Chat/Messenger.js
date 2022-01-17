import "./messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "./ChatOnline";

export default function Messenger() {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message/>
              <Message own={true}/>
            </div>
            <div className='chatBoxBottom'>
              <textarea className="chatMessageInput" placeholder="Write something">
              </textarea>
              <button className="chatSubmitButton">Send </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
          </div>
        </div>
      </div>
    </>
  );
}

  