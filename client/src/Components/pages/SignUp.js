import React from "react";
import usePostBody from "../../hooks/usePostBody";
import SignUpForm from "../Forms/SignUpForm";
import FormWrapper from "../Forms/FormWrapper";
import useSetAsArray from "../../hooks/useSetAsArray";

import { validateSignUpForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";

function SignUp({ history }) {
  const [errors, addError] = useSetAsArray();
  const [setBodyAndPost] = usePostBody("/api/auth/signup");

  // unneeded async
  const handleSubmit = async function (obj) {
    if (validateSignUpForm(obj, addError)) {
      setBodyAndPost(obj).then((postResponse) => {
        if (postResponse.status === 200) history.push("/Login");
        else if (postResponse.errorMessage) {
          addError(postResponse.errorMessage);
        }
      });
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

export default withHelmet({ title: "Sign Up" })(SignUp);
