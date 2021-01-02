import React, { useState } from "react";
import NewTrailForm from "../NewTrailForm";
import FormWrapper from "../FormWrapper";

import usePostBody from "../../hooks/usePostBody";
import useSetAsArray from "../../hooks/useSetAsArray";

const errorMessages = {
  NAME: "Trail Name is Too Short",
  DESC: "Trail Description is Too Short",
  LENGTH: "Trail Length must be greater than 0",
};

export default function NewTrail({ location, history }) {
  //Deconstruct url query
  const keyPairs = location.search.split("&").map((q) => q.split("="));
  // Hardcoding for now... may refactor later to be more flexible
  const params = {
    parkId: keyPairs[0][1],
    parkName: keyPairs[1][1],
  };

  // Lots of side effects here and pretty cluttered -- def in need
  // of some refactoring TLC

  const validateLengthAndSetError = (length) => {
    if (length <= 0) {
      addError(errorMessages.LENGTH);
      return false;
    }
    return true;
  };
  const validateTextAndSetError = (text, errorMessage) => {
    if (text.length <= 0) {
      addError(errorMessage);
      return false;
    }
    return true;
  };
  const validateNewTrail = ({ newTrailName, newTrailDescription, newTrailLength }) => {
    return (
      validateLengthAndSetError(newTrailLength) &&
      validateTextAndSetError(newTrailName, errorMessages.NAME) &&
      validateTextAndSetError(newTrailDescription, errorMessages.DESC)
    );
  };

  const [errors, addError, removeError] = useSetAsArray([]);
  const [formErrors, setFormErrors] = useState([]);
  const [setBodyAndPost] = usePostBody("/trail/new?_method=POST");

  const handleFormSubmit = (form) => {
    if (validateNewTrail(form)) {
      setBodyAndPost(form).then((payload) => {
        if (payload.status !== 200) setFormErrors(payload.errors);
        else {
          history.push(`/trail/${payload.trailId}`);
        }
      });
    }
  };

  return (
    <div>
      <h1>New Trail for {params.parkName}</h1>
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
