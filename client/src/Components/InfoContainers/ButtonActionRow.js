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
          display: "flex",
        marginBottom: "1rem",
      }}
    >
      <Col>
        <Button
          onClick={user.isLoggedIn ? handleReview : ()=> alert("Please Log In")}
        >
          {user && hasReviewed ? "Edit Review" : "Add Review"}
        </Button>
      </Col>
      <Col>
        <Button
          onClick={handleMap}
        >
          Map

        </Button>
      </Col>
          {user.isAdmin ?
              <Col>
              <Button
                  variant={"warning"}
                  onClick={handleEdit}>
                  Edit
          </Button>
              </Col> : null}

    </Row>
  );
}
