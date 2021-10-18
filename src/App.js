import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Messenger from "./components/Chat/Messenger";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/Pages/AboutUs";
import Faqs from "./components/Pages/Faqs";
import Feedback from "./components/Pages/Feedback";
import Vision from "./components/Pages/Vision";
import Homepage from "./components/Pages/Homepage";
import VerticalLayout from "./components/VerticalLayout";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ResourceLinks from "./components/Resources/ResourceLinks";
import Resource from "./components/Resources/Resource";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <AuthProvider>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/home" exact component={Homepage} />
            <Route path="/vision" exact component={Vision} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/signin" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <VerticalLayout>
              <Route path="/resources" exact component={Resource} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/resources/:id" component={ResourceLinks} />
              <Route path="/chat" component={Messenger} />
            </VerticalLayout>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
