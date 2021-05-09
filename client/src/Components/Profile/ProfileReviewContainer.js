import React from "react";
import { Link } from "react-router-dom";

export default function ProfileReviewContainer({
  trailId,
  title,
  text,
  ReviewId,
}) {
  return (
    <div>
      <Link to={`/review/${ReviewId}`}>
        <h3>{title}</h3>
      </Link>
      <p>{text}</p>
    </div>
  );
}