import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function getReviewsForTrail(trailId) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/trails/${trailId}`);
    return response.json();
  };
}
