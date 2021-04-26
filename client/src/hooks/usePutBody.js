/**
 * returns an empty state object and a method to set the body of a POST request to the supplied
 * endpoint. After setting the body, the post request will fire, and the returned state object will
 * contain the results of the call.
 * @param {string} endpoint
 */

export default function usePutBody(endpoint) {
    let status;
    const post = (body) => {
        return fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(payload => {
            return {...payload, status};
        });
    };
    return [post];
}
  