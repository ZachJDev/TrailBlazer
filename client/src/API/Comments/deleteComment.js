import fetch from "node-fetch";
import { COMMENT_PREFIX } from "../../config/APIRoutes";

export default function deleteComment(commentId, body = {}) {
  return async () => {
    const response = await fetch(`${COMMENT_PREFIX}/delete/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };
}
