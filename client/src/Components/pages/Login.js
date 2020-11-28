import React, { Component, useContext } from "react";
import useInputState from '../../hooks/useInputState'
import FormInputText from '../FormInputText'
import FormInputPassword from '../FormInputPassword'

import {UserContext} from '../../contexts/UserContext'

export default function Login() {
    const [username, setUsername] = useInputState('')
    const [password, setPassword] = useInputState('')
    const {user, updateUser} = useContext(UserContext)

    const handleSubmit = (e) => {
      e.preventDefault();
        updateUser({username, password})
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
