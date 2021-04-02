import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faWheelchair,
  faParking,
  faMountain,
  faUsers,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import TrailAccessibilityIcon from "../AccessibilityComponents/TrailAccessibilityIcon";
import "./TrailReview.css";

let ratingIcons = {
  difficulty: faMountain,
  goodForGroups: faUsers,
  parking: faParking,
  petFriendly: faPaw,
  wheelchairAcc: faWheelchair
}

export default function TrailReview({
  text,
  title,
  username,
  isEditable,
  ratings = {},
  handleEdit
}) {
  return (
    <div className="review">
      <div className="review-header">
        <h2 className="review-title">{title} </h2>
        <h3 className="review-user">
          Review by: {username}{" "}
          {isEditable && (
            <span className="edit-icon">
              <FontAwesomeIcon icon={faEdit} onClick={handleEdit} />
            </span>
          )}
        </h3>
      </div>
      <div className="review-ratings">
        {Object.keys(ratings).map((rating) => {
          if (ratings[rating] !== null) {
            return <TrailAccessibilityIcon key={rating} icon={ratingIcons[rating]} name={rating} rating={ratings[rating]} />;
          }
        })}
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}
