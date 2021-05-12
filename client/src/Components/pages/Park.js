import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Description from "../InfoContainers/Description";
import InfoContainer from "../InfoContainers/InfoContainer";
import ButtonActionRow from "../InfoContainers/ButtonActionRow";
import MainInfo from "../InfoContainers/MainInfo";
import Map from "../Map/Map";

import ParkTrails from "../InfoContainers/ParkTrails";

import "./Park.css";
import useBool from "../../hooks/useBool";
import { Helmet } from "react-helmet";
import useDeletePark from "../../hooks/Parks/useDeletePark";

import getPark from "../../API/Parks/getPark";

function Park({ match, history }) {
  const alertComingSoon = () => alert("Functionality Coming Soon!");
  const { isLoading, data: parkInfo } = useQuery(
    [{ id: match.params.parkId }],
    getPark(match.params.parkId)
  );
  const [showMap, flipShowMap] = useBool(false);
  const deletePark = useDeletePark(parkInfo?.parkId);

  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}

  const handleDelete = async () => {
    const check = window.confirm(
      "Warning: Deleting this park is a permanent action! Continue?"
    );
    if (check) {
      const deleteRes = await deletePark({});
      if (deleteRes.success) {
        history.push("/");
      }
    }
  };

  const AdminEdit = () => {
    history.push(`/park/${match.params.parkId}/edit`);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{parkInfo.name}</title>
      </Helmet>
      <div className="park-info">
        {parkInfo.status === 200 ? (
          <InfoContainer>
            <MainInfo className={`park-info-row`} {...parkInfo}>
              <ButtonActionRow
                showReview={false}
                handleReview={alertComingSoon}
                handleMap={flipShowMap}
                handleEdit={AdminEdit}
                handleDelete={handleDelete}
                showMap={true}
              />
            </MainInfo>
            <Map
              lat={parkInfo.location?.coordinates[0] || 0}
              lng={parkInfo.location?.coordinates[1] || 0}
              show={showMap}
            />
            <Description
              description={parkInfo.description}
              name={parkInfo.name}
            />
            <ParkTrails {...match.params.parkId} {...parkInfo} />
          </InfoContainer>
        ) : (
          <h1>Oops! We can't find that park.</h1>
        )}
      </div>
    </React.Fragment>
  );
}

export default Park;
