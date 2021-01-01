/**
 * Sends an HTTP GET request to the provided endpoint. Accepts an optional function
 * to call the returned value with. (usually to set some separate piece of state)
 * @param {string} endpoint 
 * @param {function} setOuterState 
 */
export default function useGetPayload(endpoint) {

  const get = async function() {
    console.log('fetching GET from: ', endpoint)
    let status;
     const res = await fetch(endpoint);
    status = res.status;
    const payload = await res.json();
    return { status, ...payload };
  }
  return [get];
}
