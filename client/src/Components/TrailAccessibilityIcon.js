import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let typeLabel = {
  difficulty: "Difficulty:",
  goodForGroups: "Good For Groups",
  parking: "Parking:",
  petFriendly: "Pet Friendly",
  wheelchairAcc: "Wheelchair Accessible",
};

const MINIMUM_RATINGS = 1;

export default function TrailAccessibilityIcon({
  icon = "",
  name,
  rating,
  numRatings = Infinity, // Kind of a hack default to keep css classes correct for reviews.
}) {
  let cssClass;
  // What a MESS!! there has to be a better way to do this...
  if ((/On Trailhead|Easy|Good For Groups|Pet Friendly|Wheelchair Accessible/.test(rating) && !/Not/.test(rating)) || rating === true) {
    // type coercion comes back to bite me.
    cssClass = "good";
  } else if (rating === "Close" || rating === "Medium"){
       cssClass = "neutral";
    }
  else if (numRatings < MINIMUM_RATINGS) {
    cssClass = "NER";
  } else cssClass = "bad";

  
  // Generate the Caption
  let caption;
  if (numRatings < MINIMUM_RATINGS) {
    caption = <p>Not Enough Ratings</p>;
  } else {
    caption =
      typeof rating === "boolean" ? ( // This check makes it possible for me to use this with both the review Ratings and the Trail ratings
        <p>{`${rating === false ? "Not " : ""}${typeLabel[name]}`}</p>
      ) : (
        <p>{`${rating}`}</p>
      );
  }
  return (
    <div>
      <span className={`rating-icon ${cssClass}`}>
        <FontAwesomeIcon icon={icon} />
      </span>
      {caption}
    </div>
  );
}
