import React from 'react'
import Form from 'react-bootstrap/Form'

export default function FormInputTextArea ({name, label, value, handleChange, cssClass}) {
    return (

              <Form.Control
              placeholder={label}
              as='textarea'
                onChange={handleChange}
                value={value}
                name={name}
              ></Form.Control>

    )
}