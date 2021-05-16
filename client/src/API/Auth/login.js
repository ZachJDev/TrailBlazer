import fetch from "node-fetch";
import { AUTH_PREFIX } from "../../config/APIRoutes";

export default function login(body) {
  return async () => {
    const response = await fetch(`${AUTH_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const status = response.status;
    const resBody = await response.json();
    return { ...resBody, status };
  };
}
