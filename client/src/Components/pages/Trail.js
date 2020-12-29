import React, { useEffect, useState, useContext } from "react";
import useGetPayload from "../../hooks/useGetPayload";
import useInputState from "../../hooks/useInputState";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import usePostBody from "../../hooks/usePostBody";
import NewTrailReview from "../NewTrailReview";

export default function Trail({ match, history }) {
  const { trailId } = match.params;
  const { user } = useContext(UserContext);
  const [trailReviews, setTrailReviews] = useState([]);
  const [trailInfo] = useGetPayload(`/trail/${trailId}`);
  const [reviewPayload, getReviewsAgain] = useGetPayload(
    `/reviews/trails/${trailId}`
  );
  const [postPayload, setReviewBody] = usePostBody(
    `/reviews/new?trailId=${trailId}`
  );

  useEffect(() => {
    console.log(reviewPayload)
    if (reviewPayload.reviews) setTrailReviews(reviewPayload.reviews);
  }, [reviewPayload]);

  useEffect(() => {
    if (postPayload.success) {
      getReviewsAgain();
    }
  }, [postPayload]);

  const handleSubmit = (formBody) => {
    setReviewBody(formBody);
  };

  const { length, name, description, parkId } = trailInfo;
  //I'll need to handle any 404 errors here, I think.
  return (
    <div>
      {trailInfo.park ? (
        <section>
          <div>
            <h1>
              {name}: {length} miles
            </h1>
            <p>{description}</p>
            <Link to={`/park/${parkId}`}>
              Go to {trailInfo.park ? trailInfo.park.name : ""}
            </Link>
          </div>
          <section className="reviews">
            {user.isLoggedIn && !reviewPayload.userHasReviewed && (
              <NewTrailReview submitForm={handleSubmit} isSubmitted={postPayload.success}/>
            )}
            {trailReviews.map((review, idx) => (
              <div key={idx}>
                <h2>{review.title}</h2>
                <h3>Review by: {review.username}</h3>
                <p>{review.text}</p>
              </div>
            ))}
          </section>
        </section>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
