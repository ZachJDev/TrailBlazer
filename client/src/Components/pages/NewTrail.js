import React from "react";
import NewTrailForm from "../NewTrailForm";

export default function NewTrail({match, location}) {
  const queries = location.search.split('&')
  const keyPairs = queries.map(q => q.split('='))
  // Hard coding for now... may refactor later to be more flexible,
  // Don't see the value atm
  const params = {
    parkId: keyPairs[0][1],
    parkName: keyPairs[1][1]
  }
  return (
    <div>
      <h1>New Trail for {params.parkName}</h1>
      <NewTrailForm/>
    </div>
  );
}
