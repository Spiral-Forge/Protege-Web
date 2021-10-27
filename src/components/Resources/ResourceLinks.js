import styles from "../../styles/ResourceLinks.module.css";
import { useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router";

// temp

let tempLinks = [
  {
    Title: "testing 1",
    Votes: 4,
    Link: "http://localhost:3000/resources/ML",
  },
  {
    Title: "testing 2",
    Votes: 2,
    Link: "http://localhost:3000/resources/ML",
  },
  {
    Title: "testing 3",
    Votes: 6,
    Link: "http://localhost:3000/resources/ML",
  },
  {
    Title: "testing 4",
    Votes: 4,
    Link: "http://localhost:3000/resources/ML",
  },
];

// temp

export default function ResourceLinks() {
  const [links, setLinks] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    db.collection(id)
      .get()
      .then((querySnapshot) => {
        let tempLinks = [];
        querySnapshot.forEach((doc) => {
          tempLinks.push(doc.data());
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
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1>Resource Heading</h1>
      </div>
      <div className={styles.content}>
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}

export function LinkCard({ link }) {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.card}>
      <div className={styles.vote}>
        <span>
          <AiFillCaretUp className={styles.icon} />
        </span>
        {link.Votes || 0}
        <span>
          <AiFillCaretDown className={styles.icon} />
        </span>
      </div>
      <div className={styles.desc}>
        <h3>{link.Title}</h3>
        <p onClick={() => handleClick(link.Link)}>{link.Link}</p>
      </div>
    </div>
  );
}
