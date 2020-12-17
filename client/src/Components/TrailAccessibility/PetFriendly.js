import React from 'react'

export default function PetFriendly({length = 0, name, freq, MINIMUM_RATINGS}) {
    let message = ''
    if(length >= MINIMUM_RATINGS){
     message = name === 'true' ? "Good for Pets" : "Not Good for Pets"
    }
    return (
        <div>
            <p>Pets:</p>
            <p>{message || "not enough ratings"}</p>
        </div>
    )
}
