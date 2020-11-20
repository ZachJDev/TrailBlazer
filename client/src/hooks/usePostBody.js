import { useState, useEffect } from "react";
import useBool from "./useBool";

export default function usePostBody(endpoint) {
  const [isFirstRender, updateFirstRender] = useBool(true);
  const [fetchFailed, updateFetchFail] = useBool(false);
  const [loaded, updateLoaded] = useBool(false);
  const [body, setBody] = useState({});
  const [payload, setPayload] = useState({});
  useEffect(() => {
    if (isFirstRender) {
      updateFirstRender();
    } else {
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
        // I'm not convinced that I actually need these two bool flags,
        // especially for the post parts... I'll leave them for now, 
        // But I should come back and evaluate.
        updateFetchFail();
        updateLoaded();
        setPayload({ ...payload, status: res.status });
      }
      fetchData();
    }
  }, [body]);
  return [payload, loaded, fetchFailed, setBody];
}
