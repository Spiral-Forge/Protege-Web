import styles from "../../styles/ResourceLinks.module.css";
import { useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router";

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
        setLinks(tempLinks);
      });
  });
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
        {link.Votes}
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
