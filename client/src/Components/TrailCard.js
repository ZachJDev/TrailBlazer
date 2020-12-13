import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import useGetPicture from "../hooks/useGetPicture";

import { UserContext } from "../contexts/UserContext";


export default function TrailCard({trailId, name, description, length}) {
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
            <p>
              {
                user.lengthMeasurement === 'Kilometers' ?
                `${(length * 1.609344).toFixed(2)} Km` :
                `${length} miles`
              }
            </p>
          </div>
          <div className="Trail-card-acc"></div>
          <div className="Trail-card-desc"></div>
        </Col>
      </Row>
    </Container>
  );
}
