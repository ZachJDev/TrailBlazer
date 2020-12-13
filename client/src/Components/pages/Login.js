import React, {  useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import useInputState from '../../hooks/useInputState'
import FormInputText from '../FormInputs/FormInputText'
import FormInputPassword from '../FormInputs/FormInputPassword'

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
    <div style={{
      maxWidth: "20vw",
      margin: 'auto'
    }}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormInputText value={username} handleChange={setUsername} label="username: "  name="username"/>

        <FormInputPassword value={password} handleChange={setPassword} label="password: " cssClass="input-password" name="password"/>
        <Button type="submit">Login</Button>
              </Form>
    </div>
  );
}
