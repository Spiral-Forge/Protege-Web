import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ peer, pic }) {
  return (
    <div className="conversation">
      <img className="conversationImg" src={pic} alt="" />
      <span className="conversationName">{peer.name}</span>
    </div>
  );
}
