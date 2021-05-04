import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import FormInputText from '../FormInputs/FormInputText';
import FormInputTextArea from '../FormInputs/FormInputTextArea';

import useInputState from '../../hooks/useInputState';

export default function NewTrailForm({handleSubmit, park, defaultValues}) {
    const [name, setTrailName] = useInputState(defaultValues?.name || '');
    const [description, setTrailDescription] = useInputState(defaultValues?.description || '');
    const [length, setTrailLength] = useInputState(defaultValues?.length || '');
    const [lengthUnit, setLengthUnit] = useState(defaultValues?.lengthUnit || 'm');

    const startSubmit = (event) => {
        event.preventDefault();
        handleSubmit({
            name,
            description,
            lengthUnit,
            length,
            newTrailPark: park,
        });
    };
    const handleDropdown = (key) => {
        setLengthUnit(key);
    };
    return (
        <Form
            onSubmit={startSubmit}
            style={{
                margin: '3rem 20%',
            }}
        >
            <FormInputText
                name="name"
                label="Trail Name:"
                value={name}
                handleChange={setTrailName}
                cssClass="new-Trail-name"
            />
            <FormInputTextArea
                name="description"
                label="Description:"
                value={description}
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
                        value={length}
                        name="length"
                        step=".25"
                    />
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
