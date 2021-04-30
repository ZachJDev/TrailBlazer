import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FormInputNumber({name, label, handleChange, value, cssClass, stepSize}) {
    return (
        <Form.Group className={`form-item ${cssClass || ''} `}>
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control
                type="number"
                onChange={handleChange}
                value={value}
                name={name}
                step={stepSize}
            />
        </Form.Group>
    );
}