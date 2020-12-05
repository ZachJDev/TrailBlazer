import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import FormInputText from "./FormInputText";
import FormInputTextArea from "./FormInputTextArea";

import useInputState from "../hooks/useInputState";

export default function NewTrailForm({ handleSubmit, park }) {
  const [newTrailName, setTrailName] = useInputState("");
  const [newTrailDescription, setTrailDescription] = useInputState("");
  const [newTrailLength, setTrailLength] = useInputState("");
  const [lengthUnit, setLengthUnit] = useState("m");

  const startSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      newTrailName,
      newTrailDescription,
      lengthUnit,
      newTrailLength,
      newTrailPark: park,
    });
  };
  const handleDropdown =(key) => {
    setLengthUnit(key)
  }
  return (
    <Form
      onSubmit={startSubmit}
      style={{
        margin: "3rem 20%",
      }}
    >
      <FormInputText
        name="newTrailName"
        label="Trail Name:"
        value={newTrailName}
        handleChange={setTrailName}
        cssClass="new-Trail-name"
      />
      <FormInputTextArea
        name="newTrailDescription"
        label="Description:"
        value={newTrailDescription}
        handleChange={setTrailDescription}
        cssClass="new-park-description"
      />
      <div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Length</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            onChange={setTrailLength}
            value={newTrailLength}
            name="newTrailLength"
            step=".25"
          ></Form.Control>
          <DropdownButton as={InputGroup.Append} title={lengthUnit}>
            <Dropdown.Item onSelect={handleDropdown} eventKey="m">Miles</Dropdown.Item>
            <Dropdown.Item onSelect={handleDropdown} eventKey="km">Kilometers</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>

      <Button type="submit"> Submit</Button>
    </Form>
  );
}
