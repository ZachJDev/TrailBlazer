import { useState, useEffect } from "react";
import useBool from "./useBool";
/**
 * Sends an HTTP GET request to the provided endpoint. Accepts an optional function
 * to call the returned value with. (usually to set some separate piece of state)
 * @param {string} endpoint 
 * @param {function} setOuterState 
 */
export default function useGetPayload(endpoint, setOuterState = () => {}) {
  const [fetchFailed, updateFetchFail] = useBool(false);
  const [sw, callAgain] = useBool(false)
  const [payload, setPayload] = useState({});
  useEffect(() => {
    async function fetchData() {
      let payload = {};
      const res = await fetch(endpoint);
      // I believe that, for my purposes, the only GET response code I'll 
      // need to accept is this 200. There are certainly other codes that might be
      // helpful to cause things to happen individually, but I don't see myself implementing them 
      //  in the backend any time soon.
      if (res.status === 200) {
        payload = await res.json();
      }
       else updateFetchFail()
      setPayload({ ...payload, status: res.status });
       setOuterState({ ...payload, status: res.status })
    }
    fetchData();
  }, [sw]);
  return [payload, callAgain, fetchFailed];
}
