import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Logout from "./Components/pages/Logout";
import Park from "./Components/pages/Park";
import Trail from "./Components/pages/Trail";
import NewPark from "./Components/pages/NewPark";
import NotFound from "./Components/pages/NotFound";
import NewTrail from "./Components/pages/NewTrail";
import User from "./Components/pages/User";
import Search from "./Components/pages/Search";
import SignUp from "./Components/pages/SignUp";
import Nav from "./Components/Nav";

import { UserProvider } from "./contexts/UserContext";

import "./Components/Nav.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Nav />
          <Switch>
            <Route
              path={"/home"}
              exact
              render={(routeProps) => <Home {...routeProps} />}
            />
            <Route
              path={"/login"}
              exact
              render={(routeProps) => <Login {...routeProps} />}
            />
            <Route
              path={"/logout"}
              exact
              render={(routeProps) => <Logout {...routeProps} />}
            />
            <Route
              path={"/Signup"}
              exact
              render={(routeProps) => <SignUp {...routeProps} />}
            />
            <Route
              path={"/search"}
              exact
              render={(routeProps) => <Search {...routeProps} />}
            />
            <Route
              path={"/park/new"}
              exact
              render={(routeProps) => <NewPark {...routeProps} />}
            />
            <Route
              path={"/trail/new"}
              exact
              render={(routeProps) => <NewTrail {...routeProps} />}
            />
            <Route
              path={"/park/:parkId"}
              exact
              render={(routeProps) => <Park {...routeProps} />}
            />
            <Route
              path={"/trail/:trailId"}
              exact
              render={(routeProps) => <Trail {...routeProps} />}
            />
            <Route
              path={"/user/:userId"}
              exact
              render={(routeProps) => <User {...routeProps} />}
            />
            <Route path="/:b" render={() => <NotFound />} />
            <Redirect path="/" exact to="/home" />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
