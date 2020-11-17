import React from 'react'

export default function FormInputTextArea ({name, label, value, handleChange, cssClass}) {
    return (
        <div className={cssClass}>  
                <label htmlFor={name}>Description: </label>
              <textarea
                onChange={handleChange}
                value={value}
                name={name}
              ></textarea>
            </div>
    )
}