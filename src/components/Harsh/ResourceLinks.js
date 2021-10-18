import styles from "../../styles/ResourceLinks.module.css";
import VerticalNav from "./VerticalNav";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
const links = [
  {
    id: 1,
    title: "Some Demo Title",
    url: "https://www.instagram.com/harshpandey_002/",
  },
  {
    id: 2,
    title: "Some Demo Title",
    url: "https://github.com/Spiral-Forge/Protege-Web/commits/harsh_resource/",
  },
  {
    id: 3,
    title: "Some Demo Title",
    url: "https://open.spotify.com/track/4dASQiO1Eoo3RJvt74FtXB?si=3b770c4f115e45ac",
  },
  {
    id: 4,
    title: "Some Demo Title",
    url: "https://open.spotify.com/track/7KW1AtQKFToSoF1kmyk2wE?si=9115794018fa43ba",
  },
  {
    id: 5,
    title: "Some Demo Title",
    url: "https://open.spotify.com/track/0OgGn1ofaj55l2PcihQQGV?si=d58e797bf427477b",
  },
];

export default function ResourceLinks() {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <VerticalNav />
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
      <div className={styles.desc}>
        <h3>{link.title}</h3>
        <p onClick={() => handleClick(link.url)}>{link.url}</p>
      </div>
      <div className={styles.vote}>
        <span>
          <AiFillCaretUp className={styles.icon} />
        </span>
        <span>
          <AiFillCaretDown className={styles.icon} />
        </span>
      </div>
    </div>
  );
}
