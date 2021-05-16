import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function getReviewsById(userId) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/search/userId=${userId}`);
    return response.json();
  };
}
