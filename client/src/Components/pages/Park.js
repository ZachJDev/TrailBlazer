import React from "react";
import { useMutation, useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { getPark, deletePark } from "../../API/API";

import Description from "../InfoContainers/Description";
import InfoContainer from "../InfoContainers/InfoContainer";
import ButtonActionRow from "../InfoContainers/ButtonActionRow";
import MainInfo from "../InfoContainers/MainInfo";
import Map from "../Map/Map";

import ParkTrails from "../InfoContainers/ParkTrails";

import useBool from "../../hooks/useBool";

import "./Park.css";

function Park({ match, history }) {
  const alertComingSoon = () => alert("Functionality Coming Soon!");
  const { parkId } = match.params;
  const [showMap, flipShowMap] = useBool(false);

  // Requests
  const { isLoading, data: parkInfo } = useQuery(
    [{ id: parkId }],
    getPark(parkId)
  );

  const submit = useMutation(["delete", parkId], (id) => deletePark(id)(), {
    onSuccess: (res) => {
      if (res.success) {
        history.push("/");
      }
    },
  });

  // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
  // {name, description, address, city, state}

  const handleDelete = async () => {
    const check = window.confirm(
      "Warning: Deleting this park is a permanent action! Continue?"
    );
    if (check) {
      submit.mutate(parkId);
    }
  };

  const AdminEdit = () => {
    history.push(`/park/${parkId}/edit`);
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
            <ParkTrails {...parkId} {...parkInfo} />
          </InfoContainer>
        ) : (
          <h1>Oops! We can't find that park.</h1>
        )}
      </div>
    </React.Fragment>
  );
}

export default Park;
