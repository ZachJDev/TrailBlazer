import fetch from "node-fetch";
import { REVIEW_PREFIX } from "../../config/APIRoutes";

export default function postNewReview(body) {
  return async () => {
    const response = await fetch(`${REVIEW_PREFIX}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
