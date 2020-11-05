import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Home from './Components/pages/Home'
import Login from './Components/pages/Login'
import Park from './Components/pages/Park'
import Trail from './Components/pages/Trail'
import NewPark from './Components/pages/NewPark';
import NotFound from './Components/pages/NotFound'
import NewTrail from './Components/pages/NewTrail'
import User from './Components/pages/User'
import Search from './Components/pages/Search'
import Nav from './Components/Nav'


import './Components/Nav.css'


function App() {
  return (
    <div className="App">
    <Router>
    <Nav/>
    <Switch>
  <Route path={"/home"} exact render={() =><Home/>}/>
    <Route path={"/login"} exact render={() => <Login/>} />
    <Route path={"/search"} exact render={() => <Search/>} />
    <Route path={"/park/new"} exact render={() => <NewPark/>} />
    <Route path={"/trail/new"} exact render={() => <NewTrail/>} />
    <Route path={"/park/:parkId"} exact render={() => <Park/>} />
    <Route path={"/trail/:trailId"} exact render={() => <Trail/>} />
    <Route path={"/user/:userId"} exact render={() => <User/>} />
    <Route path="/:b" render={() =><NotFound/>} />
    <Redirect path="/" exact to="/home"/>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
