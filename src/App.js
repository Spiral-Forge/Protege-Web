import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Pages/Homepage';
import Feedback from './components/Pages/Feedback';
import SignIn from './components/Pages/SignIn';
import SignUp from "./components/Pages/SignUp";
import Faqs from './components/Pages/Faqs';
import AboutUs from './components/Pages/AboutUs';
import Messenger from './components/Chat/Messenger';
import Resource  from './components/Resources/resource';
import ResourcePage  from './components/Resources/resourcepage';
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/home" exact component={Homepage} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/chat" component={Messenger} />
          <Route path='/resource' component ={Resource} />
          <Route path="/:id"  component ={ResourcePage}/>
          <Route path="/signin" component={SignIn} />
          <Route path="/register" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
