import React, { Component } from "react";
import useInputState from '../../hooks/useInputState'
import usePostBody from '../../hooks/usePostBody'
import FormInputText from '../FormInputText'
import FormInputPassword from '../FormInputPassword'

export default function Login() {
    const [username, setUsername] = useInputState('')
    const [password, setPassword] = useInputState('')
    const [payload, setBody] =  usePostBody("/auth/login")

    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {username, password}
        setBody(obj)

    }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <FormInputText value={username} handleChange={setUsername} label="username: " cssClass="input-username" name="username"/>
        <FormInputPassword value={password} handleChange={setPassword} label="password: " cssClass="input-password" name="password"/>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
