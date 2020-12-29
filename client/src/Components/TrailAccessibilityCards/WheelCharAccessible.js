import React from 'react'

export default function WheelCharAccessible({length = 0, name, freq, MINIMUM_RATINGS}) {
    let message = '';
    if(length >= MINIMUM_RATINGS) {
        message = name === 'true' ? 'Yes' : 'No';
    }
    return (
        <div>
            <p>WheelChair Friendly:</p>
            <p>{message || "not enough ratings"}</p>
        </div>
    )
}
