import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

export default function AboutCards() {
    return (
        <CardDeck style={{width: '70%', margin: '3rem auto'}}>
            <Card style={{width: '15rem'}}>
                <Card.Img variant="top"
                          src="https://images.unsplash.com/photo-1587916369702-bfa6a2a537ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80">
                </Card.Img>
                <Card.Body>
                    <Card.Title>Hike Your Way</Card.Title>
                    <Card.Text>
                        look at the hiking!
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '15rem'}}>
                <Card.Img variant="top"
                          src="https://images.unsplash.com/photo-1587916369702-bfa6a2a537ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80">
                </Card.Img>
                <Card.Body>
                    <Card.Title>Hike Your Way</Card.Title>
                    <Card.Text>
                        look at the hiking!
                    </Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '15rem'}}>
                <Card.Img variant="top"
                          src="https://images.unsplash.com/photo-1587916369702-bfa6a2a537ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80">
                </Card.Img>
                <Card.Body>
                    <Card.Title>Hike Your Way</Card.Title>
                    <Card.Text>
                        look at the hiking!
                    </Card.Text>
                </Card.Body>

            </Card>
        </CardDeck>
    );
}
