import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair, faParking, faMountain, faUsers, faPaw } from "@fortawesome/free-solid-svg-icons";

let RatingIcons = {
    difficulty: faMountain,
    goodForGroups: faUsers,
    parking: faParking,
    petFriendly: faPaw,
    wheelchairAcc: faWheelchair
}
let typeLabel = {
    difficulty: "Difficulty:",
    goodForGroups: "Good For Groups",
    parking: "Parking:",
    petFriendly: "Pet Friendly",
    wheelchairAcc: "Wheelchair Accessible"
}

export default function ReviewRating({type, rating}) {
    let cssClass;
    if( rating === 'On Trailhead' || rating === 'Easy' || rating === true) { // type coercion comes back to bite me.
        cssClass = 'good'
    } else if (rating === 'Close' || rating === 'Medium') cssClass = 'neutral'
    else cssClass = 'bad'
    return (
        <div>
        <span className={`rating-icon ${cssClass}`}> 
        <FontAwesomeIcon icon={RatingIcons[type]}/>
        </span>
        {
            typeof rating === 'boolean' ? 
            (<p>{`${rating === false ? 'Not ' : ''}${typeLabel[type]}`}</p>) :
            (<p>{`${rating}`}</p>)
        }
        
        </div>
    )
}