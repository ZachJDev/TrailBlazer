import React from 'react'
import Form from 'react-bootstrap/Form'

export default function FormInputText({name, label, handleChange, value, cssClass}) {
    return (
        <Form.Group className={cssClass || ""}>
              <Form.Label htmlFor={name}>{label}</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={value}
                name={name}
              ></Form.Control>
            </Form.Group>
    )
}