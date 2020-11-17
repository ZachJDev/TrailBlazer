import React from 'react'

export default function FormInputText({name, label, handleChange, value, cssClass}) {
    return (
        <div className={cssClass || ""}>
              <label htmlFor={name}>{label}</label>
              <input
                type="text"
                onChange={handleChange}
                value={value}
                name={name}
              ></input>
            </div>
    )
}