import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Title from "./Title";
import PictureContainer from "./PictureContainer";
import Length from "./Length";

export default function MainInfoTrail({
  name,
  length,
  parkId,
  parkName,
  children,
}) {
  return (
    <Row style={{ marginTop: "1rem" }}>
      <Col md={12} lg={6} style={{ minWidth: "40vw" }}>
        <Row xs={10} style={{ marginBottom: "4rem" }}>
          <div
            style={{
              margin: "auto",
            }}
          >
            {" "}
            <Title>{name}</Title>
            <Link to={`/park/${parkId}`}>Go to {parkName}</Link>
            <Length miles={length} />
          </div>
        </Row>
        {children}
      </Col>
      <Col
        style={{
          marginBottom: "1rem",
        }}
      >
        <PictureContainer />
      </Col>
    </Row>
  );
}
