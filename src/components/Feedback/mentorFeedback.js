import { useRef, useEffect, useState } from "react";
import styles from "../../styles/FeedbackForm.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import ErrorDialog from "../ErrorDialog";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function MentorForm({ peerID, setChatID }) {
  const { currentUser, isMentor, peerData } = useAuth();
  const scroll = useRef();

  const [chatRoomId, setChatRoomId] = useState("");
  const [enthuRate, setEnthuRate] = useState("3");
  const [performRate, setPerformRate] = useState("3");
  const [timeRate, setTimeRate] = useState("Fine");
  const [learning, setLearning] = useState("");
  const [remark, setRemark] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const scrollBottom = () => {
    if (!scroll.current) return;
    scroll.current.scrollIntoView();
    // scroll.current.scrollIntoView();
  };

  useEffect(async() => {
    scrollBottom();
    let room = "";
    console.log(peerID);
    try{
      if (peerID < currentUser.uid) {
        room = peerID + "_" + currentUser.uid;
        console.log(room)
      } else {
        room = currentUser.uid + "_" + peerID;
        console.log(room)
      }
    } catch(e) {
      console.log("Chatrroom ID error")
    }
    setChatRoomId(room);
  }, peerID)


  const [peer, setPeer] = useState({name : "", userID : ""});
  useEffect(() => {
    console.log(peerID);
    setPeer(peerData.find((o) => o.userID === peerID));
    console.log(peer);
  }, [peerData, peerID]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setEnthuRate("3");
    setPerformRate("3");
    setTimeRate("Fine");
    setLearning("");
    setRemark("");
  }, [peerID])

  const handleBack = () => {
    setChatID(null)
  }

  const handleEnthuChange =(e) => {
    setEnthuRate(e.target.value);
  };

  const handlePerformaChange = (e) => {
    setPerformRate(e.target.value);
  }

  const handleTimeChange = (e) => {
    setTimeRate(e.target.value);
  }

  const handleLearningChange = (e) => {
    setLearning(e.target.value);
  }
  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  }

  const validate = () => {
    try {
      if (!learning) {
        throw "Mentee learnings field can't be empty. Please try again";
      }

      if (!remark) {
        throw "Mentee remarks field can't be empty. Please try again";
      }
      
    } catch (err) {
      setErrorMessage(`${err}`);
      setShowErrorMessage(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {

    if (!validate()) {
      return;
    }
    let messageBody =
        "Kindly take note of your mentor's feedback for this month!\n\nWhat did your mentee learn this month?\n=> " +
            learning + 
            "\n\nHow satisfied are you by your mentee's enthusiasm?\n=> " +
            enthuRate +
            "/5\n\nHow satisfied are you by your mentee's performance?\n=> " +
            performRate +
            "/5\n\nWhat do you feel about the mentorship time you gave?\n=> " +
            timeRate +
            "\n\nRemarks for your mentee? Please include the mentee's strengths and improvement areas.\n=> " +
            remark +
            "\n";

      console.log(messageBody);

    db.collection("ChatRoom").doc(chatRoomId).collection("chats").add({
      message: messageBody,
      sentBy: currentUser.uid,
      time: new Date(),
      isRead: false,
    });

    setEnthuRate("3");
    setPerformRate("3");
    setTimeRate("Fine");
    setLearning("");
    setRemark("");
    notify();
    setChatID(null);
  }
  
  const notify = ()=>{
 
    // Calling toast method by passing string
    toast.success('Feedback Submitted',  {position: toast.POSITION.BOTTOM_CENTER})
}
  

  return (
    <div ref={scroll}>
          <div className={styles.header}>
        <div onClick={handleBack} className={styles.back}>
          <IoMdArrowBack />
        </div>
        </div>
        <h2>Feedback for {peer.name}</h2>
        <div className={`${styles.question}`}>
        <h4>What did your mentee learn this month?</h4>
        <textarea placeholder="Please briefly mention your mentee's learning" value={learning} onChange={handleLearningChange}></textarea>
        <h4>How satisfied are you by your mentee's enthusiasm?</h4>
        <div className={`${styles.radio}`}>
          <div>
            <p>1</p>
            <input type="radio" value="1" checked={enthuRate === "1"} onChange={handleEnthuChange}></input>
          </div>
          <div>
            <p>2</p>
            <input type="radio" value="2" checked={enthuRate === "2"} onChange={handleEnthuChange}></input>
          </div>
          <div>
            <p>3</p>
            <input type="radio" value="3" checked={enthuRate === "3"} onChange={handleEnthuChange}></input>
          </div>
          <div>
            <p>4</p>
            <input type="radio" value="4" checked={enthuRate === "4"} onChange={handleEnthuChange}></input>
          </div>
          <div>
            <p>5</p>
            <input type="radio" value="5" checked={enthuRate === "5"} onChange={handleEnthuChange}></input>
          </div>
        </div>
        <h4>How satisfied are you by your mentee's performance?</h4>
        <div className={`${styles.radio}`}>
          <div>
            <p>1</p>
            <input type="radio" value="1" checked={performRate === "1"} onChange={handlePerformaChange}></input>
          </div>
          <div>
            <p>2</p>
            <input type="radio" value="2" checked={performRate === "2"} onChange={handlePerformaChange}></input>
          </div>
          <div>
            <p>3</p>
            <input type="radio" value="3" checked={performRate === "3"} onChange={handlePerformaChange}></input>
          </div>
          <div>
            <p>4</p>
            <input type="radio" value="4" checked={performRate === "4"} onChange={handlePerformaChange}></input>
          </div>
          <div>
            <p>5</p>
            <input type="radio" value="5" checked={performRate === "5"} onChange={handlePerformaChange}></input>
          </div>
        </div>
        <h4>What do you feel about the mentorship time you gave?</h4>
        <div className={`${styles.radio}`}>
          <div>
            <p>Less</p>
            <input type="radio" value="Less" checked={timeRate === "Less"} onChange={handleTimeChange}></input>
          </div>
          <div>
            <p>Fine</p>
            <input type="radio" value="Fine" checked={timeRate === "Fine"} onChange={handleTimeChange}></input>
          </div>
          <div>
            <p>More</p>
            <input type="radio" value="More" checked={timeRate === "More"} onChange={handleTimeChange}></input>
          </div>
        </div>
        <h4>Remarks for you mentee? Please include the mentee's strengths and improvement areas.</h4>
        <textarea placeholder="Please breifly mention your mentee's strengths and improvement areas" value={remark} onChange={handleRemarkChange}></textarea>
        <div className={styles.cta}>
          <button className="button-1" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ErrorDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false)} errorMessage={errorMessage} />
    </div>
  );
}

