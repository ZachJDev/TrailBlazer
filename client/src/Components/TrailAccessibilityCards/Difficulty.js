import React from 'react'

export default function Difficulty({length = 0, name, freq, MINIMUM_RATINGS}) {
    return (
        <div>
            <p>Difficulty:</p>
            <p>{name || "not enough ratings"}</p>
        </div>
    )
}
