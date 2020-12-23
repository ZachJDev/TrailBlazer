import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Nav() {
  const { user } = useContext(UserContext);
  return (
    <nav className="nav">
      <div className="nav-links">
        <NavLink to="/home" activeClassName="nav-selected">
          Home
        </NavLink>
        <NavLink to="/search" activeClassName="nav-selected">
          Find a Trail
        </NavLink>
        {
          user.isAdmin &&
        (<NavLink to="/park/new" activeClassName="nav-selected">
          Add new Park
        </NavLink>)
        }
      </div>
      <div className="nav-auth">
        {user.status === 200 ? (
          <React.Fragment>
            <Link to="/user">{user.username}</Link>
            <Link to="/logout">Logout</Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}
