import React from "react";
import usePostBody from "../../hooks/usePostBody";
import SignUpForm from '../SignUpForm'
import FormWrapper from "../FormWrapper";
import useSetAsArray from "../../hooks/useSetAsArray";

// From https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const errorMessages = {
  PASSWORD_INPUT: "Confirm Password field must match Password field.",
  INVALID_EMAIL: "Invalid Email Address",
  CONFLICT: "A user already exists with that Username or Email",
};

export default function SignUp({ history }) {

  const [errors, addError, removeError] = useSetAsArray([]);
  const [setBodyAndPost] = usePostBody("/auth/signup");

  const isValidSubmittal = ({password, confirmPassword, emailAddress}) => {
    return password === confirmPassword && emailRegex.test(emailAddress);
  };
  const handleEmailError = ({emailAddress}) => {
    if (!emailRegex.test(emailAddress)) addError(errorMessages.INVALID_EMAIL);
    else removeError(errorMessages.INVALID_EMAIL);
  };
  const handlePasswordError = ({confirmPassword, password}) => {
    if (confirmPassword !== password) addError(errorMessages.PASSWORD_INPUT);
    else removeError(errorMessages.PASSWORD_INPUT);
  };

  const handleSubmit =  async function (obj) { 
    handleEmailError(obj);
    handlePasswordError(obj);
    if (isValidSubmittal(obj)){
      setBodyAndPost(obj).then(postResponse => {
        if (postResponse.status === 200) history.push("/Login");
          else if (postResponse.errorType) {
            addError(errorMessages[postResponse.errorType]);
          }
      })
      
    }
  };


  /* THE ACTUAL MARKUP */
  return (
    <div
      style={{
        maxWidth: "20vw",
        margin: "auto",
      }}
    >
      <h1>Sign Up</h1>
      <FormWrapper errors={errors}>
        <SignUpForm handleSubmit={handleSubmit} />
      </FormWrapper>
    </div>
  );
}
