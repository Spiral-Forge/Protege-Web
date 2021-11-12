import styles from "../styles/VerticalFlex.module.css";
import VerticalNav from "./VerticalNav";
import { useAuth } from "../context/AuthContext";
export default function VerticalLayout({ children }) {
  const { currentUser } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        {currentUser && <VerticalNav />}
        {children}
      </div>
    </div>
  );
}
