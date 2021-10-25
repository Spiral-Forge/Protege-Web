import styles from "../../styles/Resource.module.css";
import { useHistory } from "react-router-dom";

const cards = [
  {
    id: 1,
    img: "https://source.unsplash.com/random/400x300",
    txt: "Development",
    url: "Development",
  },
  {
    id: 2,
    img: "https://source.unsplash.com/random/400x420",
    txt: "Machine Learning",
    url: "ML",
  },
  {
    id: 3,
    img: "https://source.unsplash.com/random/400x402",
    txt: "Scholorships",
    url: "Scholorships",
  },
  {
    id: 4,
    img: "https://source.unsplash.com/random/400x320",
    txt: "Open Source",
    txt: "OpenSource",
  },
  {
    id: 5,
    img: "https://source.unsplash.com/random/300x400",
    txt: "Competitive Coding",
    txt: "CompCoding",
  },
  {
    id: 6,
    img: "https://source.unsplash.com/random/430x400",
    txt: "Development",
  },
];

export default function Resource() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Resource Center</h1>
      </div>
      <div className={styles.content}>
        {cards.map((card) => (
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
        <img src={card.img} alt="" />
      </div>
      <p>{card.txt}</p>
    </div>
  );
}
