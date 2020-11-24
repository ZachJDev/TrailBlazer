import React from 'react'

export default function FormInputSelect({name, label, handleChange, value, cssClass, options}) {
    return (
        <div className={cssClass || ""}>
             {label ? <label htmlFor={name}>{label}</label> : null }
              <select
                onChange={handleChange}
                value={value}
                name={name}
              >
                  {options.map(opt => (
                      <option value={opt} key={opt}>{opt}</option>
                  ))}
              </select>
            </div>
    )
}