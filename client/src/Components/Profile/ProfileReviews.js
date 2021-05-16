import React, { useState } from "react";
import TrailReview from "../Reviews/TrailReview";

import "./ProfileReviews.css";
import { useQuery } from "react-query";
import { getReviewsByUserId } from "../../API/API";

export default function ProfileReviews({ userId, username = "" }) {
  const [reviews, setReviews] = useState(null);
  const { isLoading, isError } = useQuery(
    ["getReviews", userId],
    getReviewsByUserId(userId),
    {
      onSuccess: (res) => {
        setReviews(res.reviews);
      },
    }
  );

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    return <h2>Something went wrong.. Please try again later</h2>;
  }

  return (
    <div className={"profile-reviews"}>
      {reviews?.length > 0 ? (
        reviews.map((review) => {
          return (
            <TrailReview
              {...review}
              key={review.ReviewId}
              reviewId={review.ReviewId}
              username={username}
              useComments={false}
              showTrail={true}
              showPark={true}
              park={review.trail.park}
              trail={review.trail}
            />
          );
        })
      ) : (
        <p>Do Not Have Reviews</p>
      )}
    </div>
  );
}
