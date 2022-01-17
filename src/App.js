import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Messenger from "./components/Chat/Messenger";
import Navbar from "./components/Navbar/Navbar";
import Faqs from "./components/Pages/Faqs/Faqs";
import Vision from "./components/Pages/Vision";
import Homepage from "./components/Pages/Home/Homepage";
import VerticalLayout from "./components/VerticalLayout";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import { useAuth } from "./context/AuthContext";
import ResourceLinks from "./components/Resources/ResourceLinks";
import Resource from "./components/Resources/Resource";
import Profile from "./components/Profile/Profile";
import Deadlines from "./components/Pages/Deadlines";

function App() {
  const history = useHistory();
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/signin">
            {!currentUser ? <SignIn /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/register">
            {!currentUser ? <SignUp /> : <Redirect to="/home" />}
          </Route>
          <VerticalLayout>
            <Route path="/home" exact component={Homepage} />
            <Route path="/vision" exact component={Vision} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/resources" exact>
              {currentUser ? <Resource /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/resources/:resource">
              {currentUser ? <ResourceLinks /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/chat/:id">
              {currentUser ? <Messenger /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/chat">
              {currentUser ? <Messenger /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/profile">
              {currentUser ? <Profile /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/deadlines">
              {currentUser ? <Deadlines /> : <Redirect to="/signin" />}
            </Route>
          </VerticalLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
