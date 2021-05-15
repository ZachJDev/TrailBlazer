import React from "react";
import SignUpForm from "../Forms/SignUpForm";
import FormWrapper from "../Forms/FormWrapper";
import useSetAsArray from "../../hooks/useSetAsArray";

import { validateSignUpForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation } from "react-query";
import { signUp } from "../../API/API";

function SignUp({ history }) {
  const [errors, addError] = useSetAsArray();
  const submitSignup = useMutation(["signup"], (obj) => signUp(obj)(), {
    onSuccess: (postResponse) => {
      if (postResponse.success) history.push("/Login");
      else if (postResponse.errorMessage) {
        addError(postResponse.errorMessage);
      }
    },
  });

  // unneeded async
  const handleSubmit = async function (obj) {
    if (validateSignUpForm(obj, addError)) {
      submitSignup.mutate(obj);
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
