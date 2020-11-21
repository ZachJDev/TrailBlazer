import { useState, useEffect } from "react";
import useBool from "./useBool";

export default function useGetPayload(endpoint) {
  const [fetchFailed, updateFetchFail] = useBool(false);
  const [loaded, updateLoaded] = useBool(false)
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
      updateLoaded()
      setPayload({ ...payload, status: res.status });
    }
    fetchData();
  }, []);
  return [payload, loaded, fetchFailed];
}
