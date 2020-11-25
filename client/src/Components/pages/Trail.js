import React from "react";
import useGetPayload from '../../hooks/useGetPayload'
import {Link} from 'react-router-dom'

export default function Trail({match, history}) {
    const [trailInfo] = useGetPayload(`/trail/${match.params.trailId}`)
    //I'll need to handle any 404 errors here, I think.
    const {length, name, description, parkId} = trailInfo
    console.log(trailInfo)
  return (
    <div>
      <h1>{name}: {length} miles</h1>
      <p>{description}</p>
    <Link to={`/park/${parkId}`}>Go to {trailInfo.park ? trailInfo.park.name : ''}</Link>
    </div>
  );
}
