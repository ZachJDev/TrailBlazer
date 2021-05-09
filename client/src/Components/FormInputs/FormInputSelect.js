import React from "react";
import Form from "react-bootstrap/Form";

export default function FormInputSelect({
  name,
  label,
  handleChange,
  value,
  cssClass,
  options,
}) {
  return (
    <Form.Group className={cssClass || ""}>
      {label ? <Form.Label htmlFor={name}>{label}</Form.Label> : null}
      <Form.Control
        as="select"
        onChange={handleChange}
        value={value}
        name={name}
      >
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}