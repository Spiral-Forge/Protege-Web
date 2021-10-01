import { useAuth } from "../context/AuthContext";
import "./LayoutWithVerticalNav.css";
import VerticalNav from "./VerticalNav/VerticalNav";
const LayoutWithVerticalNav = ({ children }) => {
  const {currentUser} = useAuth()
  return (
    <div className="layout-with-vertical-nav">
      {currentUser && <VerticalNav />}
      <div className="layout-with-vertical-nav-main">{children}</div>
    </div>
  );
};

export default LayoutWithVerticalNav;
