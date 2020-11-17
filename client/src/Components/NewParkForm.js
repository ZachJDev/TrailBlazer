import React, { Component } from "react";
import FormInputText from "./FormInputText";
import useInputState from "../hooks/useInputState";
import FormInputTextArea from "./pages/FormInputTextArea";

export default function NewParkForm({ handleSubmit, formErrors }) {
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
  return (
    <div>
      <h1>Add new Park</h1>
      <section>
        <form onSubmit={startSubmit}>
          <FormInputText
            name="name"
            label="Name:"
            value={newParkName}
            handleChange={setParkName}
            cssClass="new=park-name"
          />
          <FormInputTextArea
            name="description"
            label="Description:"
            value={newParkDescription}
            handleChange={setParkDescription}
            cssClass="new-park-description"
          />
          <FormInputText
            name="address"
            cssClass="new-park-loc"
            label="Address:"
            value={newParkAddress}
            handleChange={setParkAddress}
          />
          <FormInputText
            name="city"
            cssClass="new-park-city"
            label="City:"
            value={newParkCity}
            handleChange={setParkCity}
          />
          <FormInputText
            name="state"
            cssClass="new-park-state"
            label="State:"
            value={newParkState}
            handleChange={setParkState}
          />
          <FormInputText
            name="country"
            cssClass="new-park-country"
            label="Country:"
            value={newParkCountry}
            handleChange={setParkCountry}
          />
          <FormInputText
            name="zipCode"
            cssClass="new-park-zip-code"
            label="Zip Code:"
            value={newParkZipCode}
            handleChange={setParkZipCode}
          />
          <input type="submit"></input>
        </form>
      </section>
    </div>
  );
}
