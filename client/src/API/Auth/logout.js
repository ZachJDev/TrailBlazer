import fetch from "node-fetch";
import { AUTH_PREFIX } from "../../config/APIRoutes";

export default function logout(body = {}) {
  return async () => {
    const response = await fetch(`${AUTH_PREFIX}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
