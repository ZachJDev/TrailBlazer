import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import useGetPicture from "../hooks/useGetPicture";

export default function InfoContainer({
  name,
  description,
  address,
  zipcode,
  city,
  state,
  children,
}) {
  const [picUrl] = useGetPicture("");
  return (
    <Container
      
    >
      <Row style={{}}>
        <Col>
          <Row style={{ marginBottom: "9rem" }}>
            <div
              style={{
                textAlign: "left",
              }}
            >
              <h1
                style={{
                  fontSize: "5rem",
                }}
              >
                {name}
              </h1>
              <div
                style={{
                  margin: "1rem 10rem",
                }}
              >
                <p>{address}</p>
                <p>
                  {city}, {state}
                </p>
              </div>
            </div>
          </Row>
          <div
            style={{
              marginBottom: "1rem",
            }}
            className="button-row"
          >
            <Row>
              <Button>Add Review</Button>
              <Button>Share</Button>
            </Row>
          </div>
        </Col>
        <Col>
          <Image
            style={{
              margin: "1rem",
              maxHeight: "20rem",
            }}
            src={picUrl}
            fluid
            rounded
          />
        </Col>
      </Row>
      <Row
        style={{
          borderTop: "1px solid rgb(0,0,0,.1)",
          borderBottom: "1px solid rgb(0,0,0,.1)",
        }}
      >
        <h2>About {name}</h2>
        <p>{description}</p>
      </Row>
      {children}
    </Container>
  );
}
