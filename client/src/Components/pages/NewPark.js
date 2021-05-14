import React, { useState } from "react";
import NewParkForm from "../Forms/NewParkForm";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";

import { validateNewParkForm } from "../../functions/formValidation";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation } from "react-query";
import { postNewPark } from "../../API/API";

function NewPark({ history }) {
  const [formErrors, setFormErrors] = useState([]);
  const [errors, addError] = useSetAsArray();

  const submit = useMutation(["newPark"], (obj) => postNewPark(obj)(), {
    onSuccess: (res) => {
      setFormErrors(res.errors);
      if (res.status === 401) {
        // Not Authorized
        history.push("/home");
      } else if (res.status === 200) {
        history.push(`/park/${res.parkId}`);
      }
    },
  });

  const handleFormSubmit = (form) => {
    if (validateNewParkForm(form, addError)) {
      // this pattern isn't clear -- the validate form function has the side effect of adding errors to the page, but returns a boolean. may want a refactor.
      submit.mutate(form);
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
