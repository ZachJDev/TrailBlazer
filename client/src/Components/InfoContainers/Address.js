import React from 'react'

export default function Address({address, city, state}) {
    return (
        <React.Fragment>
             <p>{address}</p>
            <p>
              {city}, {state}
            </p>
        </React.Fragment>
    )
}
