import React, { useState, useEffect } from "react";
import useGetPayload from "../../hooks/useGetPayload";
import Description from "../InfoContainers/Description";
import InfoContainer from "../InfoContainers/InfoContainer";
import ButtonActionRow from "../InfoContainers/ButtonActionRow";
import MainInfo from "../InfoContainers/MainInfo";

import ParkTrails from "../InfoContainers/ParkTrails";

export default function Park({ match }) {
  const alertComingSoon = () => alert("Functionality Coming Soon!");
  const [parkInfo, setParkInfo] = useState({})
  const [getParkInfo] = useGetPayload(`/park/${match.params.parkId}`);
  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}

  useEffect(() => {
    getParkInfo().then(info => {
      setParkInfo(info)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])
  return (
    <div className="park-info">
    {
      parkInfo.status === 200 ? (

      <InfoContainer>
        <MainInfo {...parkInfo}>
          <ButtonActionRow
            handleReview={alertComingSoon}
            handleMap={alertComingSoon}
            handleShare={alertComingSoon}
          />
        </MainInfo>
        <Description description={parkInfo.description} name={parkInfo.name} />
        <ParkTrails {...match.params.parkId} {...parkInfo} />
      </InfoContainer>
      ) :(
        <h1>
        Loading...
        </h1>
      ) 
    }
    </div>
  );
}
