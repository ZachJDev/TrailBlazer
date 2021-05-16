import fetch from "node-fetch";
import { USER_PREFIX } from "../../config/APIRoutes";

export default function deleteUser(userId) {
  return async () => {
    const response = await fetch(`${USER_PREFIX}/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return response.json();
  };
}
