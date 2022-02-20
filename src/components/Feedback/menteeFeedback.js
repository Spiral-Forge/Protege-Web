import { useRef, useEffect, useState } from "react";
import styles from "../../styles/FeedbackForm.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import ErrorDialog from "../ErrorDialog";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


export default function MenteeForm({ peerID, setChatID }) {
  const { currentUser, peerData } = useAuth();
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
        throw "Your learnings field can't be empty. Please try again";
      }

      if (!remark) {
        throw "Your future goals field can't be empty. Please try again";
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
    "Kindly take note of your mentee's feedback for this month! \n\nWhat new did you learn this month? \n=> " +
    learning +
    "\n\nHow useful did you find your mentor's help in learning something new?\n=> " +
    enthuRate +
    "/5\n\nHow useful did you find mentor's help help in finding the right resources?\n=> " +
   performRate +
    "/5\n\nWhat do you feel about the mentorship time you recieved?\n=> " +
    timeRate +
    "\n\nWhat do you want to achieve in the next month?\n=> " +
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
    <div  ref={scroll}>
      <div className={styles.header}>
        <div onClick={handleBack} className={styles.back}>
          <IoMdArrowBack />
        </div>
        </div>
        <h2>Feedback for {peer.name}</h2>
        <div className={`${styles.question}`}>
        <h4>What did you learn this month?</h4>
        <textarea placeholder="Please breifly mention your learnings" value={learning} onChange={handleLearningChange}></textarea>
        <h4>How useful did you find your mentor's help in learning something new?</h4>
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
        <h4>How useful did you find mentor's help help in finding the right resources?</h4>
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
        <h4>What do you feel about the mentorship time you recieved?</h4>
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
        <h4>What do you want to achieve in the next month?</h4>
        <textarea placeholder="Please breifly mention your goals" value={remark} onChange={handleRemarkChange}></textarea>
        <div className={styles.cta}>
          <button className="button-1" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ErrorDialog isOpen={showErrorMessage} closeModal={()=> setShowErrorMessage(false)} errorMessage={errorMessage} />
    </div>
  );
}

