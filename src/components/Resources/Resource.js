import styles from "../../styles/Resource.module.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../firebase";
import { useState } from "react";

// export const resourceCategories = [
//   {
//     id: 1,
//     img: "development.png",
//     txt: "Development",
//     url: "Development",
//   },
//   {
//     id: 2,
//     img: "ml.png",
//     txt: "Machine Learning",
//     url: "ML",
//   },
//   {
//     id: 3,
//     img: "blogs.png",
//     txt: "Scholarships",
//     url: "Scholarship",
//   },
//   {
//     id: 4,
//     img: "opensrc.png",
//     txt: "Open Source",
//     url: "OpenSource",
//   },
//   {
//     id: 5,
//     img: "competitive.jpg",
//     txt: "Competitive Coding",
//     url: "CompCoding",
//   },
//   {
//     id: 6,
//     img: "college.jpg",
//     txt: "College Resources",
//     url: "College",
//   },
//   {
//     id: 7,
//     img: "blogs.png",
//     txt: "Blogs and Articles",
//     url: "Blogs and Articles",
//   },{
//     id: 6,
//     img: "other.png",
//     txt: "Miscellaneous",
//     url: "Miscellaneous",
//   },
// ];

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
    <div onClick={() => handleClick(card.url)} className={styles.card}>
      <div className={styles.img}>
        <img src={card.categoryLogo} alt="" />
      </div>
      <p>{card.categoryName}</p>
    </div>
  );
}
