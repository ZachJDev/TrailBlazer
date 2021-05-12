import fetch from "node-fetch";
import { SEARCH_PREFIX } from "../../config/APIRoutes";

export default function searchReq(searchType, searchTerm) {
  return async () => {
    const response = await fetch(
      `${SEARCH_PREFIX}/${searchType}?q=${searchTerm}`
    );
    return response.json();
  };
}
