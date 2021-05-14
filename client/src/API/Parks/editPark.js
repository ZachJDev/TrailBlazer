import fetch from "node-fetch";
import { PARK_PREFIX } from "../../config/APIRoutes";

export default function editPark({ parkId, body }) {
  return async () => {
    const response = await fetch(`${PARK_PREFIX}/${parkId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
