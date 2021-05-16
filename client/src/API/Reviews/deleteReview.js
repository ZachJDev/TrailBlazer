import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function deleteReview(reviewId) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/delete/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return response.json();
  };
}
