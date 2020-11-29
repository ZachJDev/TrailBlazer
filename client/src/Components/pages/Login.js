import React, {  useContext, useEffect } from "react";
import useInputState from '../../hooks/useInputState'
import FormInputText from '../FormInputText'
import FormInputPassword from '../FormInputPassword'

import {UserContext} from '../../contexts/UserContext'

export default function Login({history, match}) {
    const [username, setUsername] = useInputState('')
    const [password, setPassword] = useInputState('')
    const {user, updateUser, errors} = useContext(UserContext)

    const handleSubmit = (e) => {
      e.preventDefault();
        updateUser({username, password})
    }

    useEffect(() => {
      if(user.status === 200) history.push('/home')
    }, [errors])
  return (
    <div>
      <h1>Login</h1>
      {errors.errorMessage ? 
        <div>
          <h3>{errors.errorMessage}</h3>
        </div>
        : null
      }
      <form>
        <FormInputText value={username} handleChange={setUsername} label="username: " cssClass="input-username" name="username"/>
        <FormInputPassword value={password} handleChange={setPassword} label="password: " cssClass="input-password" name="password"/>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
