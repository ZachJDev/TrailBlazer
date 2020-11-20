import React, { Component } from "react";
import FormInputText from "./FormInputText";
import useInputState from "../hooks/useInputState";
import FormInputTextArea from "./pages/FormInputTextArea";

export default function NewParkForm({ handleSubmit, missing }) {
  const [newParkName, setParkName] = useInputState("");
  const [newParkAddress, setParkAddress] = useInputState("");
  const [newParkCountry, setParkCountry] = useInputState("");
  const [newParkState, setParkState] = useInputState("");
  const [newParkZipCode, setParkZipCode] = useInputState("");
  const [newParkCity, setParkCity] = useInputState("");
  const [newParkDescription, setParkDescription] = useInputState("");

  const startSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      newParkName,
      newParkDescription,
      newParkAddress,
      newParkCity,
      newParkState,
      newParkZipCode,
      newParkCountry,
    });
  };
// I REALLY dislike hardcoding the input name in the hasError prop, like below. 
// refactoring that to be more responsive to change would be great.
  return (
    <div>
      <h1>Add new Park</h1>
      <section>
        <form onSubmit={startSubmit}>
          <FormInputText
            name="newParkName"
            label="Name:"
            value={newParkName}
            handleChange={setParkName}
            cssClass="new-park-name"
            hasError = {missing.includes("newParkName")}
          />
          <FormInputTextArea
            name="newParkDescription"
            label="Description:"
            value={newParkDescription}
            handleChange={setParkDescription}
            cssClass="new-park-description"
            hasError = {missing.includes("newParkDescription")}
          />
          <FormInputText
            name="newParkAddress"
            cssClass="new-park-loc"
            label="Address:"
            value={newParkAddress}
            handleChange={setParkAddress}
            hasError = {missing.includes("newParkAddress")}
          />
          <FormInputText
            name="newParkCity"
            cssClass="new-park-city"
            label="City:"
            value={newParkCity}
            handleChange={setParkCity}
            hasError = {missing.includes("newParkCity")}
          />
          <FormInputText
            name="newParkState"
            cssClass="new-park-state"
            label="State:"
            value={newParkState}
            handleChange={setParkState}
            hasError = {missing.includes("newParkState")}
          />
          <FormInputText
            name="newParkCountry"
            cssClass="new-park-country"
            label="Country:"
            value={newParkCountry}
            handleChange={setParkCountry}
            hasError = {missing.includes("newParkCountry")}
          />
          <FormInputText
            name="newParkZipCode"
            cssClass="new-park-zip-code"
            label="Zip Code:"
            value={newParkZipCode}
            handleChange={setParkZipCode}
            hasError = {missing.includes("newParkZipCode")}
          />
          <input type="submit"></input>
        </form>
      </section>
    </div>
  );
}
