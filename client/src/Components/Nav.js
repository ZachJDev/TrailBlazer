import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";

import {UserContext} from '../contexts/UserContext'


export default function Nav() {
const {user} = useContext(UserContext)
  return (
    <nav className="nav">
      <div className="nav-links">
        <NavLink to="/home" activeClassName="nav-selected">
          Home
        </NavLink>
        <NavLink to="/search" activeClassName="nav-selected">
          Find a Trail
        </NavLink>
      </div>
      <div className="nav-auth">
      <Link to='/signup'>Sign up</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/user">{user.username ? user.username : "USER"}</Link>
      </div>
    </nav>
  );
}
