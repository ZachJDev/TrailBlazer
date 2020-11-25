import React, { Component } from "react";
import useInputState from '../../hooks/useInputState'
import FormInputText from '../FormInputText'
import FormInputPassword from '../FormInputPassword'
import usePostBody from '../../hooks/usePostBody'

export default function Login() {
    const [username, setUsername] = useInputState('')
    const [password, setPassword] = useInputState('')
    const [payload, setBodyAndPost] = usePostBody("/auth/signup?_method=POST");


    const handleSubmit = (e) => {
        e.preventDefault();
      const obj = {username, password}
      setBodyAndPost(obj)
    }
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <FormInputText value={username} handleChange={setUsername} label="username: " cssClass="input-username" name="username"/>
        <FormInputPassword value={password} handleChange={setPassword} label="password: " cssClass="input-password" name="password"/>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
