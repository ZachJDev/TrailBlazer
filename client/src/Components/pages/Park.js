import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import useGetPayload from '../../hooks/useGetPayload'
import InfoContainer from "../InfoContainer";

export default function Park({ match }) {
  const [parkInfo] = useGetPayload(`/park/${match.params.parkId}`)
  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}

  return (
    <div className="park-info">
     <InfoContainer {...parkInfo} />
     {parkInfo.trails ?
       parkInfo.trails.map((trail, idx) => (
         <div key={idx}>
           <Link to={`/trail/${trail.trailId}`}>{trail.name}</Link>
         </div>
       ))
       : null
     }
     <div>
       <Link to={`/trail/new?parkId=${match.params.parkId}&park=${parkInfo.name}`}>Add New Trail</Link>
     </div>
    </div>
  );
}
