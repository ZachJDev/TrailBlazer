import fetch from "node-fetch";
import { TRAIL_PREFIX } from "../../config/APIRoutes";

export default function getTrail(trailId) {
  return async () => {
    const response = await fetch(`${TRAIL_PREFIX}/${trailId}`);
    return response.json();
  };
}
