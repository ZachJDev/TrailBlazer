import fetch from "node-fetch";
import { TRAIL_PREFIX } from "../../config/APIRoutes";

export default function postNewTrail(body) {
  return async () => {
    const response = await fetch(`${TRAIL_PREFIX}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
