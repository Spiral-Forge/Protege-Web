import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
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
import ResourceLinks from "./components/Resources/ResourceLinks";
import Resource from "./components/Resources/Resource";
import Profile from "./components/Profile/Profile";
import Deadlines from "./components/Pages/Deadlines";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedbackList from "./components/Feedback/Feedback";


function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <VerticalLayout>
              <Route path="/" exact component={Homepage} />
              <Route path="/vision" exact component={Vision} />
              <Route path="/faqs" component={Faqs} />
              <ProtectedRoute path="/resources" exact component={Resource} />
              <ProtectedRoute path="/resources/:resource" component={ResourceLinks} />
              {/* <ProtectedRoute path="/chat/:id" component={Messenger} /> */}
              <ProtectedRoute exact path="/chat" component={Messenger} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/deadlines" component={Deadlines} />
              <ProtectedRoute path="/feedback" component={FeedbackList} />
            </VerticalLayout>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
