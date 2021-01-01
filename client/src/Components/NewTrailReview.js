import React, { useEffect, useContext } from "react";

import useInputState from "../hooks/useInputState";
import { UserContext } from "../contexts/UserContext";

export default function NewTrailReview({ isSubmitted, submitForm }) {
  const [reviewText, setReviewText, clearText] = useInputState("");
  const [reviewTitle, setReviewTitle, clearTitle] = useInputState("");

  const [parking, setParking] = useInputState("On Trailhead");

  const { user } = useContext(UserContext);
  const username = user.username

  useEffect(() => {
    if (isSubmitted) {
      // Clears and refreshes reviews only after we know the review was successfully posted
      clearText();
      clearTitle();
    }
  }, [isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({ reviewTitle, reviewText, parking, username });
  };
  return (
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
        <option value="On Trailhead">On Trailhead</option>
        <option value="Close">Close</option>
        <option value="Far">Far</option>
        <option value="No Marked Parking">No Marked Parking</option>
      </select>
    </section>
  );
}
