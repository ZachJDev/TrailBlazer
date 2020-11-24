import React from 'react'

export default function FormInputNumber({name, label, handleChange, value, cssClass, stepSize}) {
    return (
        <div className={cssClass || ""}>
              <label htmlFor={name}>{label}</label>
              <input
                type="number"
                onChange={handleChange}
                value={value}
                name={name}
                step={stepSize}
              ></input>
            </div>
    )
}