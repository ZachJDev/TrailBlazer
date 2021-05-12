import fetch from "node-fetch";
import { PARK_PREFIX } from "../../config/APIRoutes";

export default function getPark(parkId) {
  return async () => {
    const response = await fetch(`${PARK_PREFIX}${parkId}`);
    return response.json();
  };
}
