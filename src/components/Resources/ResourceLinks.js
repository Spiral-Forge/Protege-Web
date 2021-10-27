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

  useEffect(() => {
    db.collection(resource)
      .get()
      .then((querySnapshot) => {
        let tempLinks = [];
        querySnapshot.forEach((doc) => {
          tempLinks.push({ id: doc.id, ...doc.data() });
        });
        tempLinks.sort((a, b) => {
          const isVotesUnDefA = typeof a.Votes === "undefined";
          const isVotesUnDefB = typeof b.Votes === "undefined";
          return a.Votes > b.Votes || isVotesUnDefB
            ? -1
            : a.Votes < b.Votes || isVotesUnDefA
            ? 1
            : 0;
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
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            setLinks={setLinks}
            links={links}
            userId={currentUser.uid}
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
    let indexOfNewLink;
    let tempLinks = links.map((linkSnap, index) => {
      if (linkSnap.id === link.id) {
        if (linkSnap.votesMap && linkSnap.votesMap[userId]) return linkSnap;
        indexOfNewLink = index;
        if (!linkSnap.Votes) linkSnap.Votes = 1;
        else if (linkSnap.votesMap[userId] === false) {
          linkSnap.Votes += 2;
        } else linkSnap.Votes += 1;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
        linkSnap.votesMap[userId] = true;
      }
      return linkSnap;
    });
    setLinks(tempLinks);
    if (indexOfNewLink >= 0) UpdateDb(tempLinks[indexOfNewLink]);
  };
  const handleDownvote = () => {
    let indexOfNewLink;
    let tempLinks = links.map((linkSnap, index) => {
      if (linkSnap.id === link.id) {
        if (linkSnap.votesMap && !linkSnap.votesMap[userId]) return linkSnap;
        indexOfNewLink = index;
        if (!linkSnap.Votes) linkSnap.Votes = -1;
        else if (linkSnap.votesMap[userId]) {
          linkSnap.Votes -= 2;
        } else linkSnap.Votes -= 1;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
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
        {link.Votes || 0}
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
        <h3>{link.Title}</h3>
        <p onClick={() => handleClick(link.Link)}>{link.Link}</p>
      </div>
    </div>
  );
}
