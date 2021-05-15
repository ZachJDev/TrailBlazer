import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function editReview({ trailId, body }) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/edit?trailId=${trailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
