import fetch from "node-fetch";
import { USER_PREFIX } from "../../config/APIRoutes";

export default function getUserData(userId) {
  return async () => {
    const response = await fetch(`${USER_PREFIX}/${userId}`);
    return response.json();
  };
}
