import "./Message.css";

export default function Message({ message, own, pic, timestamp }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={pic} alt="" />
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{new Date(timestamp).toUTCString()}</div>
    </div>
  );
}
