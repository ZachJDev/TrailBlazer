import React from 'react'
import FormInputText from './FormInputText'
import FormInputTextArea from './FormInputTextArea'
import FormInputNumber from './FormInputNumber'
import FormInputSelect from './FormInputSelect'
import useInputState from '../hooks/useInputState'

export default function NewTrailForm({handleSubmit, park}) {
    const [newTrailName, setTrailName] = useInputState("");
    const [newTrailDescription, setTrailDescription] = useInputState("");
    const [newTrailLength, setTrailLength] = useInputState("");
    const [lengthUnit, setLengthUnit] = useInputState("m")

    const startSubmit = (event) => {
        event.preventDefault();
        handleSubmit({
          newTrailName,
          newTrailDescription,
          lengthUnit,
          newTrailLength,
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
            name="newTrailDescription"
            label="Description:"
            value={newTrailDescription}
            handleChange={setTrailDescription}
            cssClass="new-park-description"
          />
          <div>
          <FormInputNumber 
            name="newTrailLength"
            label="length:"
            value={newTrailLength}
            handleChange={setTrailLength}
            cssClass="new-park-description"
            stepSize=".25"
          />
        <FormInputSelect
          name="lengthUnit"
          label={false}
          value={lengthUnit}
          handleChange={setLengthUnit}
          cssClass="length-unit-select"
          options={["m", "km"]}
        />
        </div>
          <input type="submit"/>
        </form>
    )
}
