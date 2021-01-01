import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import useGetPicture from "../hooks/useGetPicture";

export default function SearchResultContainer({ id, name, city, state }) {
  const [picUrl] = useGetPicture();

  return (
    <Container
      className="Search-card"
      style={{
        border: "2px solid black",
        margin: " 1rem auto",
        maxHeight: "15rem",
      }}
    >
      <Row>
        <Col>
          <Image
            className="Search-card-img"
            style={{
              maxHeight: "13rem",
              margin: "1rem auto",
            }}
            src={picUrl}
            rounded={true}
            fluid
          />
        </Col>
        <Col xs={9} className="Search-card-info">
          <div className="Search-card-header">
            <Link to={`/park/${id}`}>
              <h2>{name}</h2>
            </Link>
            <div>
              <p>
                {city} {state}
              </p>
            </div>
          </div>
          <div className="Search-card-acc"></div>
          <div className="Search-card-desc"></div>
        </Col>
      </Row>
    </Container>
  );
}
