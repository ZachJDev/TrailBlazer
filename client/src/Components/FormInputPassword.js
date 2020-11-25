import React from 'react'

export default function FormInputPassword({name, label, handleChange, value, cssClass}) {
    return (
        <div className={cssClass || ""}>
              <label htmlFor={name}>{label}</label>
              <input
                type="password"
                onChange={handleChange}
                value={value}
                name={name}
              ></input>
            </div>
    )
}