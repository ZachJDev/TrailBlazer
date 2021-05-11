import React, { useEffect, useState } from "react";
import useGetPayload from "../../hooks/useGetPayload";
import TrailReview from "../Reviews/TrailReview";
import { Helmet } from "react-helmet";

export default function ReviewPage({ match, history }) {
  const [review, setReview] = useState(null);
  const [title, setTitle] = useState("TrailBlazer | Hike your Way");
  const [getReview] = useGetPayload(`/reviews/${match.params.reviewId}`);

  useEffect(() => {
    getReview().then((reviewRes) => {
      if (reviewRes.success) {
        setReview(reviewRes.review);
        setTitle(` Review For: ${reviewRes.review.trail.name}`);
      } else {
        // TODO: Handle Errors better
        alert("Something went wrong. Please try again later.");
      }
    });
  }, []);

  const handleReviewRedirect = () => {
    history.push(`/trail/${review.trailId}/reviews/edit`);
  };

  return review ? (
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
  ) : null;
}
