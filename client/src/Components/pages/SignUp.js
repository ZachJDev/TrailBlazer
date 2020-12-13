import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import useInputState from '../../hooks/useInputState'
import usePostBody from '../../hooks/usePostBody'

import FormInputText from '../FormInputs/FormInputText'
import FormInputPassword from '../FormInputs/FormInputPassword'



export default function Login() {
    const [username, setUsername] = useInputState('')
    const [password, setPassword] = useInputState('')
    const [emailAddress, setEmailAddress] = useInputState('')
    const [payload, setBodyAndPost] = usePostBody("/auth/signup?_method=POST");


    const handleSubmit = (e) => {
        e.preventDefault();
      const obj = {username, password, emailAddress}
      setBodyAndPost(obj)
    }
  return (
    <div style={{
      maxWidth: "20vw",
      margin: 'auto'
    }}>
      <h1>Sign Up</h1>
      <Form>
        <FormInputText value={username} handleChange={setUsername} label="username: " cssClass="input-username" name="username"/>
        <FormInputText value={emailAddress} handleChange={setEmailAddress} label="email: " cssClass="input-email" name="email"/>
        <FormInputPassword value={password} handleChange={setPassword} label="password: " cssClass="input-password" name="password"/>
        <FormInputPassword value={password} handleChange={setPassword} label="confirm password: " cssClass="input-password" name="password"/>
        <Button type="submit">Sign up</Button>
              </Form>
    </div>
  );
}
