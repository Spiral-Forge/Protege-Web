import styles from "../../styles/Resource.module.css";
import { useHistory } from "react-router-dom";

export const resourceCategories = [
  {
    id: 1,
    img: "development.png",
    txt: "Development",
    url: "Development",
  },
  {
    id: 2,
    img: "ml.png",
    txt: "Machine Learning",
    url: "ML",
  },
  {
    id: 3,
    img: "blogs.png",
    txt: "Scholarships",
    url: "Scholarship",
  },
  {
    id: 4,
    img: "opensrc.png",
    txt: "Open Source",
    url: "OpenSource",
  },
  {
    id: 5,
    img: "competitive.jpg",
    txt: "Competitive Coding",
    url: "CompCoding",
  },
  {
    id: 6,
    img: "college.jpg",
    txt: "College Resources",
    url: "College",
  },
  {
    id: 7,
    img: "blogs.png",
    txt: "Blogs and Articles",
    url: "Blogs and Articles",
  },{
    id: 6,
    img: "other.png",
    txt: "Miscellaneous",
    url: "Miscellaneous",
  },
];

export default function Resource() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Resource Center</h1>
      </div>
      <div className={styles.content}>
        {resourceCategories.map((card) => (
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
        <img src={"./assets/resources/" + card.img} alt="" />
      </div>
      <p>{card.txt}</p>
    </div>
  );
}
