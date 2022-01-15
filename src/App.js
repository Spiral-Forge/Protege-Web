import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
// import Messenger from "./components/ChatUrvi/Messenger";
import Messenger from "./components/Chat/Messenger";
import Navbar from "./components/Navbar/Navbar";
import Faqs from "./components/Pages/Faqs/Faqs";
import Feedback from "./components/Pages/Feedback";
import Vision from "./components/Pages/Vision";
import Homepage from "./components/Pages/Home/Homepage";
import VerticalLayout from "./components/VerticalLayout";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ResourceLinks from "./components/Resources/ResourceLinks";
import Resource from "./components/Resources/Resource";
import Profile from "./components/Profile/Profile";
import Deadlines from "./components/Pages/Deadlines";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <VerticalLayout>
              <Route path="/home" exact component={Homepage} />
              <Route path="/vision" exact component={Vision} />
              <Route path="/faqs" component={Faqs} />
              <Route path="/resources" exact component={Resource} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/resources/:resource" component={ResourceLinks} />
              <Route path="/chat/:id" component={Messenger} />
              <Route exact path="/chat" component={Messenger} />
              <Route path="/profile" component={Profile} />
              <Route path="/deadlines" component={Deadlines} />
            </VerticalLayout>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
