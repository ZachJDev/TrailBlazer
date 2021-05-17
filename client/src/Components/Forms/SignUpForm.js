import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import useInputState from "../../hooks/useInputState";
import useBool from "../../hooks/useBool";

import FormInputText from "../FormInputs/FormInputText";
import FormInputPassword from "../FormInputs/FormInputPassword";
import FormInputSelect from "../FormInputs/FormInputSelect";
import FormInputTextArea from "../FormInputs/FormInputTextArea";

export default function SignUpForm({ handleSubmit }) {
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [confirmPassword, setConfirmPassword] = useInputState("");
  const [emailAddress, setEmailAddress] = useInputState("");
  const [bio, setBio] = useInputState("");
  const [measure, setMeasure] = useInputState("Miles");
  const [isAdmin, switchAdmin] = useBool(false);

  const SubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({
      username,
      password,
      confirmPassword,
      emailAddress,
      measure,
      isAdmin,
      bio,
    });
  };

  return (
    <Form onSubmit={SubmitForm}>
      <FormInputText
        value={username}
        handleChange={setUsername}
        label="username: "
        cssClass="input-username"
        name="username"
      />
      <FormInputText
        value={emailAddress}
        handleChange={setEmailAddress}
        label="email: "
        cssClass="input-email"
        name="email"
      />
      <FormInputPassword
        value={password}
        handleChange={setPassword}
        label="password: "
        cssClass="input-password"
        name="password"
      />
      <FormInputPassword
        value={confirmPassword}
        handleChange={setConfirmPassword}
        label="confirm password: "
        cssClass="input-password"
        name="password"
      />
      <FormInputSelect
        value={measure}
        options={["Miles", "Kilometers"]}
        label="Preferred Length Measurement:"
        name="length"
        handleChange={setMeasure}
      />
      <FormInputTextArea
        value={bio}
        handleChange={setBio}
        name={"bio"}
        label={"Tell us about yourself:"}
      />
      <Form.Check
        id={"AdminCheck"}
        tile={"Admin?"}
        label={"Admin?"}
        onClick={switchAdmin}
      />
      <Button type="submit">Sign up</Button>
    </Form>
  );
}
