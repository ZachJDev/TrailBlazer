import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import FormInputText from "../FormInputs/FormInputText";
import FormInputTextArea from "../FormInputs/FormInputTextArea";
import useInputState from "../../hooks/useInputState";

export default function NewParkForm({
  handleSubmit,
  missing = [],
  defaultValues,
  isEdit = false,
}) {
  const [name, setParkName] = useInputState(defaultValues?.name || "");
  const [address, setParkAddress] = useInputState(defaultValues?.address || "");
  const [country, setParkCountry] = useInputState(defaultValues?.country || "");
  const [state, setParkState] = useInputState(defaultValues?.state || "");
  const [zipCode, setParkZipCode] = useInputState(
    defaultValues?.zipCode.toString() || ""
  );
  const [city, setParkCity] = useInputState(defaultValues?.city || "");
  const [description, setParkDescription] = useInputState(
    defaultValues?.description || ""
  );

  const startSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      name,
      description,
      address,
      city,
      state,
      zipCode,
      country,
    });
  };

  // I REALLY dislike hardcoding the input name in the hasError prop, like below.
  // refactoring that to be more responsive to change would be great.
  return (
    <div>
      <section>
        <Form
          onSubmit={startSubmit}
          style={{
            margin: "0 20%",
          }}
        >
          <FormInputText
            name="name"
            label="Name:"
            value={name}
            handleChange={setParkName}
            cssClass="new-park-name"
            hasError={missing.includes("name")}
          />
          <FormInputTextArea
            name="description"
            label="Description:"
            value={description}
            handleChange={setParkDescription}
            cssClass="new-park-description"
            hasError={missing.includes("description")}
          />
          <FormInputText
            name="address"
            cssClass="new-park-loc"
            label="Address:"
            value={address}
            handleChange={setParkAddress}
            hasError={missing.includes("address")}
          />
          <InputGroup>
            <FormInputText
              name="city"
              cssClass="new-park-city"
              label="City:"
              value={city}
              handleChange={setParkCity}
              hasError={missing.includes("city")}
            />
            <FormInputText
              name="state"
              cssClass="new-park-state"
              label="State:"
              value={state}
              handleChange={setParkState}
              hasError={missing.includes("state")}
            />
          </InputGroup>
          <InputGroup>
            <FormInputText
              name="country"
              cssClass="new-park-country"
              label="Country:"
              value={country}
              handleChange={setParkCountry}
              hasError={missing.includes("country")}
            />
            <FormInputText
              name="zipCode"
              cssClass="new-park-zip-code"
              label="Zip Code:"
              value={zipCode}
              handleChange={setParkZipCode}
              hasError={missing.includes("zipCode")}
            />
          </InputGroup>
          <Button type="submit">{isEdit ? "Edit" : "Add new"} Park</Button>
        </Form>
      </section>
    </div>
  );
}
