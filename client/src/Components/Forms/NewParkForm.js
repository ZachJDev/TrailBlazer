import React, { useReducer } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import FormInputText from "../FormInputs/FormInputText";
import FormInputTextArea from "../FormInputs/FormInputTextArea";

import "./NewParkForm.css";

export default function NewParkForm({
  history,
  handleSubmit,
  missing = [],
  defaultValues,
}) {
  const initialValues = {
    name: defaultValues?.name || "",
    address: defaultValues?.address || "",
    country: defaultValues?.country || "",
    state: defaultValues?.state || "",
    zipCode: defaultValues?.zipCode.toString() || "",
    city: defaultValues?.city || "",
    description: defaultValues?.description || "",
  };

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const { name, address, state, zipCode, city, description } = formValues;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const startSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formValues);
  };

  // I REALLY dislike hardcoding the input name in the hasError prop, like below.
  // refactoring that to be more responsive to change would be great.
  return (
    <div>
      <section>
        <Form className={" new-park-form"} onSubmit={startSubmit}>
          <FormInputText
            name="name"
            label="Name:"
            value={name}
            handleChange={handleFormChange}
            cssClass="new-park-name"
            hasError={missing.includes("name")}
          />
          <FormInputTextArea
            name="description"
            label="Description:"
            value={description}
            handleChange={handleFormChange}
            cssClass="new-park-description"
            hasError={missing.includes("description")}
          />
          <FormInputText
            name="address"
            cssClass="new-park-loc"
            label="Address:"
            value={address}
            handleChange={handleFormChange}
            hasError={missing.includes("address")}
          />
          <InputGroup>
            <FormInputText
              name="city"
              cssClass="new-park-city"
              label="City:"
              value={city}
              handleChange={handleFormChange}
              hasError={missing.includes("city")}
            />
            <FormInputText
              name="state"
              cssClass="new-park-state"
              label="State:"
              value={state}
              handleChange={handleFormChange}
              hasError={missing.includes("state")}
            />
            <FormInputText
              name="zipCode"
              cssClass="new-park-zip-code"
              label="Zip Code:"
              value={zipCode}
              handleChange={handleFormChange}
              hasError={missing.includes("zipCode")}
            />
          </InputGroup>
          <Button
            className={"button cancel"}
            variant="warning"
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={"button submit"} type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </div>
  );
}
