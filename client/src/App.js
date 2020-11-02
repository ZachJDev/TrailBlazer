import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import NotFound from './Components/NotFound'



function App() {
  return (
    <div className="App">
    <Router>
    <Switch>
  <Route path={"/home"} exact render={() =><Home/>}/>
  {
    // Login Page
    // Park Page
    // Trail Page
    // User Page
    // Add/Edit Park page
    // Add/Edit Trail
  }
    <Route path="/:b" render={() =><NotFound/>} />
    <Redirect path="/" exact to="/home"/>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
