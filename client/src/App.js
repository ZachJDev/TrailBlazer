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
  <Route path={"/home"} exact render={(routeProps) => <Home {...routeProps}/>}/>
    <Route path={"/login"} exact render={(routeProps) => <Login/>} />
    <Route path={"/search"} exact render={(routeProps) => <Search/>} />
    <Route path={"/park/new"} exact render={(routeProps) => <NewPark/>} />
    <Route path={"/trail/new"} exact render={(routeProps) => <NewTrail/>} />
    <Route path={"/park/:parkId"} exact render={(routeProps) => <Park {...routeProps}/>} />
    <Route path={"/trail/:trailId"} exact render={(routeProps) => <Trail/>} />
    <Route path={"/user/:userId"} exact render={(routeProps) => <User/>} />
    <Route path="/:b" render={() =><NotFound/>} />
    <Redirect path="/" exact to="/home"/>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
