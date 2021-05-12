import fetch from "node-fetch";
import { COMMENT_PREFIX } from "../../config/APIRoutes";

export default function postNewComment(body) {
  return async () => {
    const response = await fetch(`${COMMENT_PREFIX}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
