import fetch from "node-fetch";
import { TRAIL_PREFIX } from "../../config/APIRoutes";

export default function deleteTrail(trailId, body = {}) {
  return async () => {
    const response = await fetch(`${TRAIL_PREFIX}/delete/${trailId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
