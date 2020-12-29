import React from 'react'

export default function Title({children}) {
    return (
        <h1
            style={{
              width: "100%",
              fontSize: "5rem",
            }}
          >
            {children}
          </h1>
    )
}
