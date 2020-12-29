import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import TrailAccessibility from "./TrailAccessibility";

import useGetPicture from "../hooks/useGetPicture";
import useGetPayload from "../hooks/useGetPayload";

import { UserContext } from "../contexts/UserContext";
import Length from "./InfoContainers/Length";

export default function TrailCard({
  trailId,
  name,
  description,
  length,
  park,
}) {
  const { user } = useContext(UserContext);
  const [picUrl] = useGetPicture();

  return (
    <Container
      className="Trail-card"
      style={{
        border: "2px solid black",
        margin: " 1rem auto",
        maxHeight: "13rem",
      }}
    >
      <Row>
        <Col>
          <Image
            className="Trail-card-img"
            style={{
              maxHeight: "11rem",
              margin: "1rem auto",
            }}
            src={picUrl}
            rounded={true}
            fluid
          />
        </Col>
        <Col xs={9} className="Trail-card-info">
          <div className="Trail-card-header">
            <Link to={`/trail/${trailId}`}>
              <h2>{name}</h2>
            </Link>
            {/*Trying to use the below syntax some more */}
            {park && (
              <Link to={`/park/${park.parkId}`}>
                <h6>{park.name}</h6>
              </Link>
            )}
            <Length miles={length}/>
          </div>
          <TrailAccessibility trailId={trailId} />
          <div className="Trail-card-desc"></div>
        </Col>
      </Row>
    </Container>
  );
}
