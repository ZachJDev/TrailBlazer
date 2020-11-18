import React, { Component } from "react";
import useInputState from '../../hooks/useInputState'
import FormInputText from '../FormInputText'
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
        <FormInputText value={username} handleChange={setUsername} label="username" cssClass="input-username" name="username"/>
        <FormInputText value={password} handleChange={setPassword} label="password" cssClass="input-password" name="password"/>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
