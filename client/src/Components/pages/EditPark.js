import React, { useContext, useState } from "react";
import "../Forms/TrailReviewForm.css";

import { validateNewParkForm } from "../../functions/formValidation";

import FormWrapper from "../Forms/FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";
import useBool from "../../hooks/useBool";

import { UserContext } from "../../contexts/UserContext";
import NewParkForm from "../Forms/NewParkForm";

import withHelmet from "../../HigherOrderComponents/withHelmet";
import { editPark, getPark } from "../../API/API";
import { useMutation, useQuery } from "react-query";

function EditPark({ match, history }) {
  const { params } = match;
  const { user } = useContext(UserContext);
  const { parkId } = params;

  const [hasLoaded, flipHasLoaded] = useBool(false);
  const [errors, addError] = useSetAsArray();
  const [currentPark, setCurrentPark] = useState({});

  useQuery(["getPark", parkId], getPark(parkId), {
    onSuccess: (res) => {
      setCurrentPark(res);
      flipHasLoaded();
    },
  });

  const submit = useMutation(
    `editPark - ${params.parkId}`,
    (obj) => editPark(obj)(),
    {
      onSuccess: (res) => {
        if (res.success) {
          history.push(`/park/${params.parkId}`);
        } else if (res.status === 401) {
          alert("You are not authorized to perform that action.");
        } else {
          addError(res.errorMessage);
        }
      },
    }
  );

  let AwaitingInfoNotice = () => {
    if (hasLoaded && !user.isAdmin) {
      return "Forbidden Action Performed.";
    }
    if (!hasLoaded) {
      return "Loading Form...";
    }
  };

  const handleSubmit = (formBody) => {
    if (validateNewParkForm(formBody, addError)) {
      submit.mutate({ parkId, body: formBody });
    }
  };

  return (
    <section className="add-review">
      {hasLoaded && user.isAdmin ? (
        <React.Fragment>
          <h1>Edit Park</h1>
          <FormWrapper errors={errors}>
            <NewParkForm
              handleSubmit={handleSubmit}
              defaultValues={currentPark}
              isEdit={true}
              history={history}
            />
          </FormWrapper>
        </React.Fragment>
      ) : (
        <h2>{AwaitingInfoNotice()} </h2>
      )}
    </section>
  );
}

export default withHelmet({ title: "Edit Park" })(EditPark);
