import fetch from "node-fetch";

export default function getPark(parkId) {
  return async () => {
    const response = await fetch(`/park/${parkId}`);
    return response.json();
  };
}
