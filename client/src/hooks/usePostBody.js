import { useState, useEffect } from "react";
import useBool from "./useBool";
/**
 * returns an empty state object and a method to set the body of a POST request to the supplied
 * endpoint. After setting the body, the post request will fire, and the returned state object will 
 * contain the results of the call.
 * @param {string} endpoint 
 */

export default function usePostBody(endpoint) {
  // I can't help but feel like this pattern of setting the body but returning the payload from the 
  // API call may not be clear...
  const [isFirstRender, updateFirstRender] = useBool(true);
  const [body, setBody] = useState({});
  const [retPayload, setPayload] = useState({});
  useEffect(() => {
    if (isFirstRender) {
      // This 'first render' thing feels hacky to me -- Maybe I shouldn't even be using hooks.
      updateFirstRender();
    } else {
      // make an IIFE?
      async function fetchData() {
        let payload = {};
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        payload = await res.json();
        setPayload({ ...payload, status: res.status });
      }
      fetchData();
    }
  }, [body]);
  return [retPayload, setBody];
}
