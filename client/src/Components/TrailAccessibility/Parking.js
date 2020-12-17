import React from 'react'

export default function Parking({length = 0, name, freq, MINIMUM_RATINGS}) {
    return (
        <div>
            <p>Parking:</p>
            <p>{name || "not enough ratings"}</p>
        </div>
    )
}
