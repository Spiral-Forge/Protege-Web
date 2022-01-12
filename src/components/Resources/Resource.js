import styles from "../../styles/Resource.module.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useState } from "react";

export default function Resource() {
  const tempCardsData = [];
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    db.collection("resources01")
      .get()
      .then((querySnap) => {
        querySnap.forEach((snap) => {
          tempCardsData.push(snap.data());
        });
      })
      .then(() => {
        setCardsData(tempCardsData);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Resource Center</h1>
      </div>
      <div className={styles.content}>
        {cardsData.map((card) => (
          <ResourceCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export function ResourceCard({ card }) {
  let history = useHistory();

  const handleClick = (url) => {
    history.push("/resources/" + url);
  };

  return (
    <div
      onClick={() => handleClick(card.categoryName.split(" ").join("-"))}
      className={styles.card}
    >
      <div className={styles.img}>
        <img src={card.categoryLogo} alt="" />
      </div>
      <p>{card.categoryName}</p>
    </div>
  );
}
