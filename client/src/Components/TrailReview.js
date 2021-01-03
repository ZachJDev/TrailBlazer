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
import ReviewRating from "./ReviewRating";
import "./TrailReview.css";

export default function TrailReview({
  text,
  title,
  username,
  isEditable,
  ratings = {},
}) {
  return (
    <div className="review">
      <div className="review-header">
        <h2 className="review-title">{title} </h2>
        <h3 className="review-user">
          Review by: {username}{" "}
          {isEditable && (
            <span className="edit-icon">
              <FontAwesomeIcon icon={faEdit} />
            </span>
          )}
        </h3>
      </div>
      <div className="review-ratings">
        {Object.keys(ratings).map((rating) => {
          if (ratings[rating] !== null) {
            return <ReviewRating key={rating} type={rating} rating={ratings[rating]} />;
          }
        })}
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}
