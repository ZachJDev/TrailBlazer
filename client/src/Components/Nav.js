import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
    <div className="nav-links">
      <NavLink to="/home" activeClassName="nav-selected">Home</NavLink>
      <NavLink to="/search" activeClassName="nav-selected">Find a Trail</NavLink>
    </div>
      <div className="nav-auth">
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/user">USER_NAME</Link>
      </div>
    </nav>
        )
    }
}
