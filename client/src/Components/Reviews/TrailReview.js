import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faEdit,
  faMountain,
  faParking,
  faPaw,
  faTrash,
  faUsers,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";
import TrailAccessibilityIcon from "../AccessibilityComponents/TrailAccessibilityIcon";
import "./TrailReview.css";
import ReviewComments from "../ReviewComments/ReviewComments";
import withHeader from "../../HigherOrderComponents/withHeader";
import { ReviewProvider } from "../../contexts/ReviewContext";
import { useMutation } from "react-query";
import { deleteReview } from "../../API/API";

let ratingIcons = {
  difficulty: faMountain,
  goodForGroups: faUsers,
  parking: faParking,
  petFriendly: faPaw,
  wheelchairAcc: faWheelchair,
};

export default function TrailReview({
  text,
  title,
  username,
  userId = "",
  isEditable,
  ratings = {},
  handleEdit,
  reviewId,
  useLink = true,
  useComments = true,
  showPark = false,
  showTrail = false,
  park = {},
  trail = {},
  refreshReviews,
}) {
  const submitDeleteReview = useMutation(
    ["deleteReview", reviewId],
    (reviewId) => deleteReview(reviewId)(),
    {
      onSuccess: (deleteRes) => {
        if (deleteRes.success) {
          refreshReviews();
        }
      },
    }
  );
  const handleDelete = async () => {
    const check = window.confirm(
      "Warning: Deleting a review is a permanent procedure. Continue?"
    );
    if (check) {
      await submitDeleteReview.mutate(reviewId);
    }
  };
  return (
    <ReviewProvider id={reviewId}>
      <div className="review">
        <div className="review-header">
          <div className={"title-box"}>
            {useLink ? (
              <Link to={`/review/${reviewId}`}>
                <h2 className="review-title">{title} </h2>
              </Link>
            ) : (
              <h2 className="review-title">{title} </h2>
            )}
            <div className={"links"}>
              {showPark ? (
                <Link to={`/park/${park.parkId}`}>
                  <p>{`Park: ${park.name}`}</p>
                </Link>
              ) : null}
              {showTrail ? (
                <Link to={`/trail/${trail.trailId}`}>
                  <p>{`Trail: ${trail.name}`}</p>
                </Link>
              ) : null}
            </div>
          </div>
          <h3 className="review-user">
            Review by: <Link to={`/user/${userId}`}> {username} </Link>
            {isEditable && (
              <React.Fragment>
                <span className="review_edit-icon review_icon">
                  <FontAwesomeIcon icon={faEdit} onClick={handleEdit} />
                </span>
                <span className={"review_delete-button  review_icon"}>
                  <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
                </span>
              </React.Fragment>
            )}
          </h3>
        </div>
        <div className="review-ratings">
          {Object.keys(ratings).map((rating) => {
            if (ratings[rating] !== null) {
              return (
                <TrailAccessibilityIcon
                  key={rating}
                  icon={ratingIcons[rating]}
                  name={rating}
                  rating={ratings[rating]}
                />
              );
            } else return null;
          })}
        </div>
        <p className="review-text">{text}</p>
        {useComments
          ? withHeader(
              <ReviewComments reviewId={reviewId} />,
              "Comments:",
              "comments"
            )
          : null}
      </div>
    </ReviewProvider>
  );
}
