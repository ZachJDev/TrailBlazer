import React from 'react'
import Form from 'react-bootstrap/Form'

export default function FormInputTextArea ({name, label, value, handleChange, cssClass}) {
    return (
        <Form.Group className={cssClass}>  
                <Form.Label htmlFor={name}>{label}</Form.Label>
              <Form.Control
              as='textarea'
                onChange={handleChange}
                value={value}
                name={name}
              ></Form.Control>
            </Form.Group>
    )
}