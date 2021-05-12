import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function getReviewById(reviewId) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/${reviewId}`);
    return response.json();
  };
}
