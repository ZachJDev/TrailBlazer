import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PictureContainer from "./PictureContainer";

import Title from "./Title";
import Address from "./Address";

export default function MainInfo({
  className,
  name,
  address,
  city,
  state,
  children,
}) {
  return (
    <Row className={className} style={{ marginTop: "1rem" }}>
      <Col md={12} lg={6} style={{ minWidth: "40vw" }}>
        <Row xs={10} style={{ marginBottom: "9rem" }}>
          <div
            style={{
              margin: "auto",
            }}
          >
            <Title>{name}</Title>
            <Address address={address} city={city} state={state} />
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
