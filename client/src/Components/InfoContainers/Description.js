import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Description({description, name}) {
    return (
        <Row
            style={{
                borderTop: '1px solid rgb(0,0,0,.1)',
                borderBottom: '1px solid rgb(0,0,0,.1)',
            }}
        ><Col xs={12}>
            <h2>About {name}:</h2>
        </Col>
            <Col>
                <p style={{
                    textAlign: 'left',
                }}>{description}</p>
            </Col>
        </Row>
    );
}
