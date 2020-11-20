import React, { useState, useEffect } from "react";
import useGetPayload from '../../hooks/useGetPayload'

export default function Park({ match }) {
  // I imagine that using something like this is better for React
  // than just storing values in the function block.
  const [parkInfo, resComplete, fetchFailed] = useGetPayload(`/park/${match.params.parkId}`)

  let parkName = "";
  // This will eventually be a more robust 'notFound' component.
  if (fetchFailed) parkName = "not Found";
  else parkName = parkInfo?.name;
  return (
    <div>
      <p>Park Page</p>
      <p>{parkName}</p>
    </div>
  );
}
