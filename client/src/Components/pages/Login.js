import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useInputState from "../../hooks/useInputState";
import FormInputText from "../FormInputs/FormInputText";
import FormInputPassword from "../FormInputs/FormInputPassword";

import { UserContext } from "../../contexts/UserContext";
import withHelmet from "../../HigherOrderComponents/withHelmet";

function Login({ history, location }) {
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const { user, updateUser, errors } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ username, password });
  };

  useEffect(() => {
    if (user.status === 200) {
      history.goBack();
    }
  }, [errors, history, user]);

  return (
    <div
      style={{
        maxWidth: "20vw",
        margin: "auto",
      }}
    >
      <h1>Login</h1>
      {errors.errorMessage && (
        <div>
          <h3>{errors.errorMessage}</h3>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <FormInputText
          value={username}
          handleChange={setUsername}
          label="username: "
          name="username"
        />
        <FormInputPassword
          value={password}
          handleChange={setPassword}
          label="password: "
          cssClass="input-password"
          name="password"
        />
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default withHelmet({ title: "Login" })(Login);
