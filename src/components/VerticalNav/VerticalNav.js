import "./VerticalNav.css";
import HomeIcon from "./Home.svg";
import ChatIcon from "./Chat.svg";
import NotificationsIcon from "./Notifications.svg";
import SettingsIcon from "./Settings.svg";
import LogOutIcon from "./LogOut.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const VerticalNav = () => {
  const { signOut } = useAuth();
  const handleLogOut = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return null;
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="vertical-nav">
      <div className="profile-pic-container">
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`}
          className="profile-pic"
        />
      </div>
      <div className="vertical-nav-btns-container">
        <Link to="/home">
          <img src={HomeIcon} className="vertical-nav-icon" />
        </Link>
        <Link to="/chat">
          <img src={ChatIcon} className="chat-icon vertical-nav-icon" />
        </Link>
        <Link to="/">
          <img src={NotificationsIcon} className="vertical-nav-icon" />
        </Link>
        <Link to="/">
          <img src={SettingsIcon} className="vertical-nav-icon" />
        </Link>
      </div>

      <img src={LogOutIcon} className="log-out-icon" onClick={handleLogOut} />
    </div>
  );
};

export default VerticalNav;
