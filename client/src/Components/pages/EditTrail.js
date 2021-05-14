import React, { useContext, useState } from "react";
import NewTrailForm from "../Forms/NewTrailForm";
import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";

import { validateNewTrailForm } from "../../functions/formValidation";
import { UserContext } from "../../contexts/UserContext";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation, useQuery } from "react-query";
import { editTrail, getTrail } from "../../API/API";

function NewTrail({ history, match }) {
  const { user } = useContext(UserContext);
  const { trailId } = match.params;

  const [errors, addError] = useSetAsArray();
  const [formErrors, setFormErrors] = useState([]);
  const [currentTrail, setCurrentTrail] = useState({});

  const { isLoading } = useQuery(["getTrail", trailId], getTrail(trailId), {
    onSuccess: (res) => {
      setCurrentTrail(res);
    },
  });

  const submit = useMutation(
    ["editTrail", trailId],
    (obj) => editTrail(obj)(),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 401) {
          alert("You are not authorized to do that action.");
        } else if (res.status !== 200) setFormErrors(res.errors);
        else {
          history.push(`/trail/${match.params.trailId}`);
        }
      },
    }
  );

  const handleFormSubmit = (body) => {
    if (validateNewTrailForm(body, addError)) {
      submit.mutate({ body, trailId });
    }
  };

  if (!isLoading && !user.isAdmin) {
    history.goBack();
  }
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Edit Trail for {currentTrail.park.name} </h1>
      <FormWrapper errors={errors}>
        <NewTrailForm
          handleSubmit={handleFormSubmit}
          missing={formErrors}
          park={currentTrail.park.parkId}
          isEdit={true}
          defaultValues={currentTrail}
        />
      </FormWrapper>
    </div>
  );
}

export default withHelmet({ title: "Edit Trail" })(NewTrail);
