import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function FormInputText({
                                          name,
                                          label,
                                          handleChange,
                                          value,
                                          cssClass,
                                          prepend,
                                          append,
                                      }) {
    return (
        <Form.Group className={`form-item ${cssClass || ''} `}>
            <InputGroup>
                {prepend}
                <Form.Control
                    placeholder={label}
                    type="text"
                    onChange={handleChange}
                    value={value}
                    name={name}
                />
                {append}
            </InputGroup>
        </Form.Group>
    );
}
