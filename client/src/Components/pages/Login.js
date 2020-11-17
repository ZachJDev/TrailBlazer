import React, { Component } from "react";
import useInputState from '../../hooks/useInputState'

export default function Login() {
    const [username, setUsername] = useInputState()
    const [password, setPassword] = useInputState()
    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {username, password}
        fetch("/auth/login")

    }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          onChange={setUsername}
          type="text"
          name="username"
          value={username}
        ></input>
        <input
          onChange={setPassword}
          type="password"
          name="password"
          value={password}
        ></input>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
