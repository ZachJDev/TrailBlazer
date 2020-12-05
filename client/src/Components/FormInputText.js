import React from 'react'
import Form from 'react-bootstrap/Form'

export default function FormInputText({name, label, handleChange, value, cssClass}) {
    return (

              <Form.Control
                type="text"
                onChange={handleChange}
                value={value}
                name={name}
              ></Form.Control>

    )
}