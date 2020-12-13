import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import PictureContainer from "./PictureContainer";

export default function MainInfo({ name, address, city, state }) {
  return (
    <Row fluid style={{ marginTop: "1rem" }}>
      <Col fluid md={12} lg={6}>
        <Row xs={10} fluid style={{ marginBottom: "9rem" }}>
          <h1
            style={{
              width: "100%",
              fontSize: "5rem",
            }}
          >
            {name}
          </h1>
          <div
            style={{
              margin: "auto",
            }}
          >
            <p>{address}</p>
            <p>
              {city}, {state}
            </p>
          </div>
        </Row>

        <Row
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          {" "}
          <Col>
            <Button
              style={{
                margin: "auto .5rem",
              }}
            >
              Add Review
            </Button>
          </Col>{" "}
          <Col>
            <Button
              style={{
                margin: "auto .5rem",
              }}
            >
              Share
            </Button>
          </Col>{" "}
          <Col>
            <Button
              style={{
                margin: "auto .5rem",
              }}
            >
              Map
            </Button>
          </Col>
        </Row>
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
