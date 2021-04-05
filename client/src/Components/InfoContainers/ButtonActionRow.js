import React, {useContext} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import {UserContext} from '../../contexts/UserContext'

export default function ButtonActionRow({
  handleReview,
  handleShare,
  handleMap,
    handleEdit,
  hasReviewed
}) {

  const {user} = useContext(UserContext)

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
          {user.isAdmin ?
              <Button
                  style={{
                      margin: "auto .5rem",
                  }}
                  onClick={handleEdit}>
                  Edit
          </Button> : null}
      </Col>
    </Row>
  );
}
