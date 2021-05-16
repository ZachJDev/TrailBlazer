import React, { useEffect, useState } from "react";
import TrailReview from "../Reviews/TrailReview";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { getReviewById } from "../../API/API";

export default function ReviewPage({ match, history }) {
  const [review, setReview] = useState(null);
  const [title, setTitle] = useState("TrailBlazer | Hike your Way");
  const { reviewId } = match.params;
  // const [getReview] = useGetPayload(`/api/reviews/${reviewId}`);

  const { isLoading, isError } = useQuery(
    ["getReview", reviewId],
    getReviewById(reviewId),
    {
      onSuccess: (reviewRes) => {
        if (reviewRes.success) {
          setReview(reviewRes.review);
          setTitle(` Review For: ${reviewRes.review.trail.name}`);
        } else {
          // TODO: Handle Errors better
          alert("Something went wrong. Please try again later.");
        }
      },
    }
  );

  // useEffect(() => {
  //   getReview().then((reviewRes) => {});
  // }, []);

  const handleReviewRedirect = () => {
    history.push(`/trail/${review.trailId}/reviews/edit`);
  };

  return (
    !isLoading && (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <TrailReview
          {...review}
          reviewId={review.reviewId}
          handleEdit={handleReviewRedirect}
          showPark={true}
          showTrail={true}
          trail={review.trail}
          useLink={false}
          park={review.trail.park}
        />
      </React.Fragment>
    )
  );
}
