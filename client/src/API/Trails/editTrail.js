import fetch from "node-fetch";
import { TRAIL_PREFIX } from "../../config/APIRoutes";

export default function editTrail(trailId, body) {
  return async () => {
    const response = await fetch(`${TRAIL_PREFIX}/${trailId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
