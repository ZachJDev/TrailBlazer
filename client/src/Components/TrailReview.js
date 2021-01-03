import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./TrailReview.css";

export default function TrailReview({ text, title, username, isEditable }) {
  return (
    <div className="review">
      <div className="review-header">
        <h2 className="review-title">{title} </h2>
        <h3 className="review-user">Review by: {username} {isEditable && (
        <span className="edit-icon">
          <FontAwesomeIcon icon={faEdit} />
        </span>
      )}</h3>
      </div>
      <div className="review-ratings">

      </div>
      <p className="review-text">{text}</p>
    </div>
  );
}
