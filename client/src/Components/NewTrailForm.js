import React from 'react'
import FormInputText from './FormInputText'
import FormInputTextArea from './FormInputTextArea'
import useInputState from '../hooks/useInputState'
export default function NewTrailForm({handleSubmit, park}) {
    const [newTrailName, setTrailName] = useInputState("")
    const [newTrailDescription, setTrailDescription] = useInputState("")

    const startSubmit = (event) => {
        event.preventDefault();
        handleSubmit({
          newTrailName,
          newTrailDescription,
          newTrailPark: park
        });
    }
    return (
        <form onSubmit={startSubmit}>
            <FormInputText
            name="newTrailName"
            label="Trail Name:"
            value={newTrailName}
            handleChange={setTrailName}
            cssClass="new-Trail-name"
          />
          <FormInputTextArea
            name="newTrailDescription"s
            label="Description:"
            value={newTrailDescription}
            handleChange={setTrailDescription}
            cssClass="new-park-description"
          />
          <input type="submit"/>
        </form>
    )
}
