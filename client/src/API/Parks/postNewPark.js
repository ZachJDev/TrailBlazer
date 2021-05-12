import fetch from "node-fetch";
import { PARK_PREFIX } from "../../config/APIRoutes";

export default function postNewPark(body) {
  return async () => {
    const response = await fetch(`${PARK_PREFIX}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
