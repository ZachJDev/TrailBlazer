import React from 'react'

export default function GoodForGroups({length = 0, name, freq, MINIMUM_RATINGS}) {
    let message = '';
    if(length >= MINIMUM_RATINGS) {

        message = name === 'true' ? "Good For Groups" : "Not Good For Groups"
    }
    return (
        <div>
            <p>Groups:</p>
            <p>{message || "not enough ratings"}</p>
        </div>
    )
}
