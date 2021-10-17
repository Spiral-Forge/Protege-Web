import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Messenger from "./components/Chat/Messenger";
import LayoutWithVerticalNav from "./components/LayoutWithVerticalNav.js";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/Pages/AboutUs";
import Faqs from "./components/Pages/Faqs";
import Feedback from "./components/Pages/Feedback";
import Homepage from "./components/Pages/Homepage";
import Harsh from "./components/Harsh/Harsh";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
// import Resource from "./components/Resources/Resource.js";
import { AuthProvider } from "./context/AuthContext";
import ResourceLinks from "./components/Harsh/ResourceLinks";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <AuthProvider>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/harsh" exact component={Harsh} />
            <Route path="/harsh/:id" component={ResourceLinks} />
            <Route path="/home" exact component={Homepage} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/signin" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <LayoutWithVerticalNav>
              <Route path="/feedback" component={Feedback} />
              <Route path="/chat" component={Messenger} />
              {/* <Route path="/resource" component={Resource} /> */}
              {/* <Route path="/:id" component={ResourcePage} />  Change the paths to exact and path for resource to '/resources/:id'  */}
            </LayoutWithVerticalNav>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
