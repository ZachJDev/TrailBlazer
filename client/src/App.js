import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
import Login from './Components/Login'
import Park from './Components/Park'
import Trail from './Components/Trail'
import NewPark from './Components/NewPark';
import NotFound from './Components/NotFound'
import NewTrail from './Components/NewTrail'
import User from './Components/User'
import Search from './Components/Search'



function App() {
  return (
    <div className="App">
    <Router>
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
