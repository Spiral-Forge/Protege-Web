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
  const [heading, setHeading] = useState("");
  const [found, setFound] = useState(false);
  const sortByvotes = (arr) => {
    arr.sort((a, b) => {
      const isvotesUnDefA = typeof a.votes === "undefined";
      const isvotesUnDefB = typeof b.votes === "undefined";
      if (isvotesUnDefB) {
        b.votes = 0;
      }
      if (isvotesUnDefA) {
        a.votes = 0;
      }
      if (a.votes < b.votes) {
        return 1;
      } else if (a.votes > b.votes) {
        return -1;
      }
      return 0;
    });
    return arr;
  };
  useEffect(() => {
    db.collection("resources01")
      .where("categoryName", "==", resource.split("-").join(" "))
      .get()
      .then((querySnapshot) => {
        let tempLinks = [];
        querySnapshot.forEach(async (doc) => {
          setHeading(doc.data().categoryName);
          await db
            .collection("resources01")
            .doc(doc.id)
            .collection("data")
            .get()
            .then((docs) => {
              docs.forEach((docu) => {
                tempLinks.push({
                  id: docu.id,
                  ...docu.data(),
                  resourceCategory: doc.id,
                });
              });
            });
          setLinks(tempLinks);
          console.log(tempLinks);
          setFound(true);
        });
      });
  }, []);
  return (
    <>
      {found && (
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h1>{heading}</h1>
          </div>
          <div className={styles.content}>
            {sortByvotes(links).map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                setLinks={setLinks}
                links={links}
                userId={currentUser && currentUser.uid}
                resourceCategory={link.resourceCategory}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function LinkCard({ link, links, setLinks, userId, resourceCategory }) {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  const UpdateDb = (newDoc) => {
    db.collection("resources01")
      .doc(resourceCategory)
      .collection("data")
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
        if (!linkSnap.votes) linkSnap.votes = 0;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
        if (linkSnap.votesMap[userId] === true) {
          linkSnap.votes -= 1;
          delete linkSnap.votesMap[userId];
          return linkSnap;
        } else if (linkSnap.votesMap[userId] === false) {
          linkSnap.votes += 2;
        } else linkSnap.votes += 1;
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
        if (!linkSnap.votes) linkSnap.votes = 0;
        if (!linkSnap.votesMap) linkSnap.votesMap = {};
        if (linkSnap.votesMap[userId] === false) {
          linkSnap.votes += 1;
          delete linkSnap.votesMap[userId];
          return linkSnap;
        } else if (linkSnap.votesMap[userId] === true) {
          linkSnap.votes -= 2;
        } else linkSnap.votes -= 1;
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
        {typeof link.votes === "undefined" ? 0 : link.votes}
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
        <h3 onClick={() => handleClick(link.link)}>{link.title}</h3>
      </div>
    </div>
  );
}
