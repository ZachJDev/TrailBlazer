import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import useGetPayload from '../../hooks/useGetPayload'
import Description from "../Description";
import InfoContainer from "../InfoContainer";
import MainInfo from "../MainInfo";

import ParkTrails from '../ParkTrails'

export default function Park({ match }) {
  const [parkInfo] = useGetPayload(`/park/${match.params.parkId}`)
  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}

  return (
    <div  className="park-info">
     <InfoContainer {...parkInfo}>
     <MainInfo {...parkInfo}/>
     <Description description={parkInfo.description} name={parkInfo.name}/>
     <ParkTrails {...match.params.parkId} {...parkInfo}/> 
     </InfoContainer>
    </div>
  );
}
