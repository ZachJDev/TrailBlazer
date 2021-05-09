import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { UserContext } from "../../contexts/UserContext";

export default function ButtonActionRow({
  handleReview,
  handleMap,
  handleEdit,
  hasReviewed,
  handleDelete,
  showReview = true,
}) {
  const { user } = useContext(UserContext);

  return (
    <Row
      style={{
        width: "100%",
        display: "flex",
        marginBottom: "1rem",
      }}
    >
      {showReview && (
        <Col>
          <Button
            onClick={
              user.isLoggedIn ? handleReview : () => alert("Please Log In")
            }
          >
            {user && hasReviewed ? "Edit Review" : "Add Review"}
          </Button>
        </Col>
      )}

      <Col>
        <Button onClick={handleMap}>Map</Button>
      </Col>
      {user.isAdmin && (
        <React.Fragment>
          <Col>
            <Button variant={"warning"} onClick={handleEdit}>
              Edit
            </Button>
          </Col>
          <Col>
            <Button variant={"warning"} onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
}
