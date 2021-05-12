import fetch from "node-fetch";
import { COMMENT_PREFIX } from "../../config/APIRoutes";

export default function getAllCommentsForReview(reviewId) {
  return async () => {
    const response = await fetch(`${COMMENT_PREFIX}/byReviewId/${reviewId}`);
    return response.json();
  };
}
