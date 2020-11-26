import { useState, useEffect } from "react";
import useBool from "./useBool";

export default function usePostBody(endpoint) {
  // I can't help but feel like this pattern of setting the body but returning the payload from the 
  // API call may not be clear...
  const [isFirstRender, updateFirstRender] = useBool(true);
  const [body, setBody] = useState({});
  const [payload, setPayload] = useState({});
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
  return [payload, setBody];
}
