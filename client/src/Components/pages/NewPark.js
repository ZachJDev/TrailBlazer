import React, { useState } from "react";
import NewParkForm from "../Forms/NewParkForm";
import usePostBody from "../../hooks/usePostBody";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";

import { validateNewParkForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";

function NewPark({ history }) {
  const [formErrors, setFormErrors] = useState([]);
  const [setBody] = usePostBody("/park/new");
  const [errors, addError] = useSetAsArray();

  const handleFormSubmit = (form) => {
    if (validateNewParkForm(form, addError)) {
      setBody(form).then((payload) => {
        setFormErrors(payload.errors);
        console.log(payload);
        if (payload.status === 401) {
          // Not Authorized
          history.push("/home");
        } else if (payload.status === 200) {
          history.push(`/park/${payload.parkId}`);
        }
      });
    }
  };

  return (
    <div>
      <h1>Add new Park</h1>
      <FormWrapper errors={errors}>
        <NewParkForm
          handleSubmit={handleFormSubmit}
          missing={formErrors || []}
        />
      </FormWrapper>
    </div>
  );
}

export default withHelmet({ title: "New Park" })(NewPark);