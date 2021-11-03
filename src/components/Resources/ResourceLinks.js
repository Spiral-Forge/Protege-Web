import styles from "../../styles/ResourceLinks.module.css";
import { useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function ResourceLinks() {
  const [links, setLinks] = useState([]);
  const { resource } = useParams();
  const { currentUser } = useAuth();

  const sortByVotes = (arr) => {
    arr.sort((a, b) => {
      const isVotesUnDefA = typeof a.Votes === "undefined";
      const isVotesUnDefB = typeof b.Votes === "undefined";
      if (isVotesUnDefB) {
        b.Votes = 0;
      }
      if (isVotesUnDefA) {
        a.Votes = 0;
      }
      if (a.Votes < b.Votes) {
        return 1;
      } else if (a.Votes > b.Votes) {
        return -1;
      }
      return 0;
    });
    return arr;
  };
  useEffect(() => {
    db.collection(resource)
      .get()
      .then((querySnapshot) => {
        let tempLinks = [];
        querySnapshot.forEach((doc) => {
          tempLinks.push({ id: doc.id, ...doc.data() });
        });
        setLinks(tempLinks);
      });
    console.log("useEffect ran");
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1>Resource Heading</h1>
      </div>
      <div className={styles.content}>
        {sortByVotes(links).map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            setLinks={setLinks}
            links={links}
            userId={currentUser && currentUser.uid}
            resourceCategory={resource}
          />
        ))}
      </div>
    </div>
  );
}

export function LinkCard({ link, links, setLinks, userId, resourceCategory }) {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  const UpdateDb = (newDoc) => {
    db.collection(resourceCategory)
      .doc(link.id)
      .set(newDoc)
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpvote = () => {
    if (!userId) {
      window.alert("Login or Signup to vote!");
      return;
    }
    let indexOfNewLink;
    let tempLinks = links.map((linkSnap, index) => {
      if (linkSnap.id === link.id) {
        indexOfNewLink = index;
        if (!linkSnap.Votes) linkSnap.Votes = 0;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
        if (linkSnap.votesMap[userId] === true) {
          linkSnap.Votes -= 1;
          delete linkSnap.votesMap[userId];
          return linkSnap;
        } else if (linkSnap.votesMap[userId] === false) {
          linkSnap.Votes += 2;
        } else linkSnap.Votes += 1;
        linkSnap.votesMap[userId] = true;
      }
      return linkSnap;
    });
    setLinks(tempLinks);
    if (indexOfNewLink >= 0) UpdateDb(tempLinks[indexOfNewLink]);
  };
  const handleDownvote = () => {
    if (!userId) {
      window.alert("Login or Signup to vote!");
      return;
    }
    let indexOfNewLink;
    let tempLinks = links.map((linkSnap, index) => {
      if (linkSnap.id === link.id) {
        indexOfNewLink = index;
        if (!linkSnap.Votes) linkSnap.Votes = 0;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
        if (linkSnap.votesMap[userId] === false) {
          linkSnap.Votes += 1;
          delete linkSnap.votesMap[userId];
          return linkSnap;
        } else if (linkSnap.votesMap[userId] === true) {
          linkSnap.Votes -= 2;
        } else linkSnap.Votes -= 1;
        linkSnap.votesMap[userId] = false;
      }
      return linkSnap;
    });
    setLinks(tempLinks);
    if (indexOfNewLink >= 0) UpdateDb(tempLinks[indexOfNewLink]);
  };
  return (
    <div className={styles.card}>
      <div className={styles.vote}>
        <span>
          <AiFillCaretUp
            className={styles.icon}
            onClick={handleUpvote}
            style={
              link.votesMap && link.votesMap[userId] ? { color: "green" } : {}
            }
          />
        </span>
        {typeof link.Votes === "undefined" ? 0 : link.Votes}
        <span>
          <AiFillCaretDown
            className={styles.icon}
            onClick={handleDownvote}
            style={
              link.votesMap && link.votesMap[userId] === false
                ? { color: "red" }
                : {}
            }
          />
        </span>
      </div>
      <div className={styles.desc}>
        <h3 onClick={() => handleClick(link.Link)}>{link.Title}</h3>
        <p onClick={() => handleClick(link.Link)}>{link.Link}</p>
      </div>
    </div>
  );
}
