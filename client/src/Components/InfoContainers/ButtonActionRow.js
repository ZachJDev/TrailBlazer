import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function ButtonActionRow({
  handleReview,
  handleShare,
  handleMap,
  user,
  hasReviewed
}) {
  return (
    <Row
      style={{
        width: "100%",
        marginBottom: "1rem",
      }}
    >
      <Col>
        <Button
          style={{
            margin: "auto .5rem",
          }}
          onClick={user.isLoggedIn ? handleReview : ()=> alert("Please Log In")}
        >
          {user && hasReviewed ? "Edit Review" : "Add Review"}
        </Button>
      </Col>
      <Col>
        <Button
          style={{
            margin: "auto .5rem",
          }}
          onClick={handleShare}
        >
          Share
        </Button>
      </Col>
      <Col>
        <Button
          style={{
            margin: "auto .5rem",
          }}
          onClick={handleMap}
        >
          Map
        </Button>
      </Col>
    </Row>
  );
}
