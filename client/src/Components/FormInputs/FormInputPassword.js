import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FormInputPassword({name, label, handleChange, value, cssClass}) {
    return (
        <Form.Group className={`form-item ${cssClass || ''} `}>
            {/* <Form.Label htmlFor={name}>{label}</Form.Label> */}
            <Form.Control
                placeholder={label}
                type="password"
                onChange={handleChange}
                value={value}
                name={name}
            />
        </Form.Group>
    );
}