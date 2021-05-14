import React, { useState } from "react";
import NewTrailForm from "../Forms/NewTrailForm";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import { useMutation } from "react-query";
import { validateNewTrailForm } from "../../functions/formValidation";

import { postNewTrail } from "../../API/API";

import withHelmet from "../../HigherOrderComponents/withHelmet";

function NewTrail({ location, history }) {
  //Deconstruct url query
  const keyPairs = location.search.split("&").map((q) => q.split("="));
  // Hardcoding for now... may refactor later to be more flexible
  const params = {
    parkId: keyPairs[0][1],
    parkName: keyPairs[1][1],
  };
  const [errors, addError] = useSetAsArray();
  const [formErrors, setFormErrors] = useState([]);

  const submit = useMutation(["newTrail"], (obj) => postNewTrail(obj)(), {
    onSuccess: (res) => {
      if (res.status !== 200) setFormErrors(res.errors);
      else {
        history.push(`/trail/${res.trailId}`);
      }
    },
  });

  const handleFormSubmit = (form) => {
    if (validateNewTrailForm(form, addError)) {
      submit.mutate(form);
    }
  };

  return (
    <div>
      <h1>New Trail for {decodeURI(params.parkName)}</h1>
      <FormWrapper errors={errors}>
        <NewTrailForm
          handleSubmit={handleFormSubmit}
          missing={formErrors}
          park={params.parkId}
        />
      </FormWrapper>
    </div>
  );
}

export default withHelmet({ title: "New Trail" })(NewTrail);
