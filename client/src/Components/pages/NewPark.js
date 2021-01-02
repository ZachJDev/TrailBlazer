import React, { useState } from "react";
import NewParkForm from "../NewParkForm";
import usePostBody from "../../hooks/usePostBody";
import FormWrapper from "../FormWrapper";

import useSetAsArray from "../../hooks/useSetAsArray";

const errorMessages = {
  NAME: "Park Name is Too Short",
  DESC: "Park Description is Too Short",
  ADDRESS: "Park Address is Too Short",
  CITY: "Park City is too short",
  ST: "States must be two letters",
  ZIP: "Zip codes must be five digits",
  COUNTRY: "Country is too short"
};

export default function NewPark({ history }) {
  const [formErrors, setFormErrors] = useState([]);
  const [setBody] = usePostBody("/park/new");
  const [errors, addError, removeError] = useSetAsArray();

  const validateNotEmpty = (text) => text.length > 0;

  const validateFormEntry = (entry, errorMessage, validation) => {
    if (!validation(entry)) {
      addError(errorMessage);
      return false;
    }
    return true;
  };
  const validateForm = ({
    newParkName,
    newParkDescription,
    newParkAddress,
    newParkCity,
    newParkState,
    newParkZipCode,
    newParkCountry
  }) => {
    const { NAME, DESC, ADDRESS, CITY, ST, ZIP, COUNTRY } = errorMessages;
    return (
      validateFormEntry(newParkName, NAME, validateNotEmpty) &&
      validateFormEntry(newParkDescription, DESC, validateNotEmpty) &&
      validateFormEntry(newParkAddress, ADDRESS, validateNotEmpty) &&
      validateFormEntry(newParkCity, CITY, validateNotEmpty) &&
      validateFormEntry(newParkCountry, COUNTRY, validateNotEmpty) &&
      validateFormEntry(newParkState, ST, (e) => e.length === 2) &&
      validateFormEntry(newParkZipCode, ZIP, (e) => e.length === 5)
    );
  };

  const handleFormSubmit = (form) => {
    if(validateForm(form)) {
      setBody(form).then((payload) => {
        setFormErrors(payload.errors);
        console.log(payload.status);
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
