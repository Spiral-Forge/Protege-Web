import "./LayoutWithVerticalNav.css";
import VerticalNav from "./VerticalNav/VerticalNav";
const LayoutWithVerticalNav = ({ children }) => {
  return (
    <div className="layout-with-vertical-nav">
      <VerticalNav />
      <div className="layout-with-vertical-nav-main">{children}</div>
    </div>
  );
};

export default LayoutWithVerticalNav;
