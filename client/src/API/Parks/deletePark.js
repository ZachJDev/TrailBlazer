import fetch from "node-fetch";
import { PARK_PREFIX } from "../../config/APIRoutes";

export default function deletePark(parkId) {
  return async () => {
    const response = await fetch(`${PARK_PREFIX}/delete/${parkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return response.json();
  };
}
