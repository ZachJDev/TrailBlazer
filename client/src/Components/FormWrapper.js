import React from 'react'

export default function FormWrapper({errors = [], children}) {

    return (
        <React.Fragment>
        {errors.length > 0 && (
        <section style={{
            width: '100%'
        }}>
            {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
                ))}
        </section>
        )
        }
        {children}
        </React.Fragment>
    )
}
