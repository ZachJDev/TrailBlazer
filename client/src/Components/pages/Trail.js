import React, { useEffect, useState, useContext } from "react";
import useGetPayload from "../../hooks/useGetPayload";
import useInputState from "../../hooks/useInputState";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import usePostBody from "../../hooks/usePostBody";

export default function Trail({ match, history }) {
  const { trailId } = match.params;
  const { user } = useContext(UserContext);
  const [reviewText, setReviewText, clearText] = useInputState("");
  const [reviewTitle, setReviewTitle, clearTitle] = useInputState("");
  const [parking, setParking, clearParking] = useInputState("On Trailhead");
  const [trailReviews, setTrailReviews] = useState([]);
  const [trailInfo] = useGetPayload(`/trail/${trailId}`);
  const [reviewPayload, getReviewsAgain] = useGetPayload(
    `/reviews/trails/${trailId}`
  );
  const [postPayload, setReviewBody] = usePostBody(
    `/reviews/new?trailId=${trailId}`
  );

  useEffect(() => {
    if (reviewPayload.reviews) setTrailReviews(reviewPayload.reviews);
  }, [reviewPayload]);

  useEffect(() => {
    if (postPayload.success) {
      // Clears and refreshes reviews only after we know the review was successfully posted
      clearText();
      clearTitle();
      getReviewsAgain();
    }
  }, [postPayload]);

  const handleSubmit = (e) => {
    e.preventDefault(); // shouldn't be anything here -- not submitting a form
    setReviewBody({ reviewText, reviewTitle, parking });
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
            {user.isLoggedIn && (
              <section className="add-review">
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={setReviewTitle}
                  placeholder="Title..."
                />
                <textarea
                  value={reviewText}
                  onChange={setReviewText}
                  placeholder="add your review..."
                ></textarea>
                <input onClick={handleSubmit} type="submit" />
                <select onChange={setParking} value={parking}>
                  <option value ='On Trailhead'>On Trailhead</option>
                  <option value ='Close'>Close</option>
                  <option value ='Far'>Far</option>
                  <option value ='No Marked Parking'>No Marked Parking</option>
                </select>
              </section>
            )}
            {trailReviews.map((review, idx) => (
              <div key={idx}>
                <h2>{review.title}</h2>
                <h3>Review by: {review.user.username}</h3>
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
