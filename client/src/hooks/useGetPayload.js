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
