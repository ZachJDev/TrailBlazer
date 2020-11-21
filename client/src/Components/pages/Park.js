import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import useGetPayload from '../../hooks/useGetPayload'
import InfoContainer from "../InfoContainer";

export default function Park({ match }) {
  const [parkInfo, resComplete, fetchFailed] = useGetPayload(`/park/${match.params.parkId}`)
  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}
  console.log(parkInfo)
  return (
    <div className="park-info">
     <InfoContainer {...parkInfo} />
     <div>
       <Link to={`/trail/new?park=${match.params.parkId}`}>Add New Trail</Link>
     </div>
    </div>
  );
}
