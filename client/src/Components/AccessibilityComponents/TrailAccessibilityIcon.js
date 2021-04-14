import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TrailAccIcon.css";

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
  freq,
  numRatings = Infinity, // Kind of a hack default to keep css classes correct for reviews.
}) {
  let [tooltipClass, setTooltipClass] = useState("icon-tooltip");
  let cssClass;
  // What a MESS!! there has to be a better way to do this...
  if (
    (/On Trailhead|Easy|Good For Groups|Pet Friendly|Wheelchair Accessible/.test(rating) &&
      !/Not/.test(rating)) ||
    rating === true
  ) {
    // type coercion comes back to bite me.
    cssClass = "good";
  } else if (rating === "Close" || rating === "Medium") {
    cssClass = "neutral";
  } else if (numRatings < MINIMUM_RATINGS) {
    cssClass = "NER";
  } else cssClass = "bad";

  // Generate the Caption
  let caption;
  if (numRatings < MINIMUM_RATINGS) {
    caption = "Not Enough Ratings";
  } else {
    caption =
      typeof rating === "boolean" // This check makes it possible for me to use this with both the review Ratings and the Trail ratings
        ? `${rating === false ? "Not " : ""}${typeLabel[name]}`
        : `${rating}`;
  }

  const handleMouseOver = (e) => setTooltipClass("icon-tooltip show");
  const handleMouseLeave = (e) => setTooltipClass("icon-tooltip");

  return (
    <div className="icon-block">
      <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className="mouseCapture">
        <span className={`rating-icon ${cssClass}`}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <p className={"caption"}>{caption}</p>
        {numRatings < Infinity && numRatings >= MINIMUM_RATINGS && (
          <div className={tooltipClass}>
            <p>{`${freq} out of ${numRatings} people thought this trail ${
              name === "Parking" ? "had parking" : "was"
            } ${caption.toLowerCase()}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
