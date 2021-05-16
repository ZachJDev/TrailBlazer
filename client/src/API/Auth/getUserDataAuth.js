import fetch from "node-fetch";
import { AUTH_PREFIX } from "../../config/APIRoutes";

export default function getUserDataAuth() {
  return async () => {
    const response = await fetch(`${AUTH_PREFIX}/userData`);
    return response.json();
  };
}
