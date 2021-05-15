import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function getReviewByUserTrail({ userId, trailId }) {
  return async () => {
    const response = await fetch(
      `${REVIEW_PREFIX}/user/${userId}?trailId=${trailId}`
    );
    return response.json();
  };
}
