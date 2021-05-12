import fetch from "node-fetch";
import { RATING_PREFIX } from "../../config/APIRoutes";

export default function getRatings(trailId) {
  return async () => {
    const response = await fetch(`${RATING_PREFIX}/trail/${trailId}`);
    return response.json();
  };
}
