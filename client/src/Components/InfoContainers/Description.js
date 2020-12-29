import React from 'react'
import Row from "react-bootstrap/Row";

export default function Description({description, name}) {
    return (
        <Row
        style={{
          borderTop: "1px solid rgb(0,0,0,.1)",
          borderBottom: "1px solid rgb(0,0,0,.1)",
        }}
      >
        <h2>About {name}</h2>
        <p style={{
          textAlign: 'left'
        }}>{description}</p>
      </Row>
    )
}
