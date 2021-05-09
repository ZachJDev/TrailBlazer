/**

 * @param {string} endpoint
 */

export default function useDeleteBody(endpoint) {
  let status;
  const req = (body) => {
    return fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((payload) => {
        return { ...payload, status };
      });
  };
  return [req];
}
