import React from "react";
import Container from "react-bootstrap/Container";

import HomeSearch from '../HomeSearch'
import AboutCards from '../AboutCards'

export default function Home() {
  return (
    <Container fluid
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541296604437-8cb5efd2da96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1991&q=80)",
          backgroundPosition: "center center",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          height: "82vh",
          width: '100%',
          marginTop: '1rem'
        }}
      >
    <HomeSearch/>
    <AboutCards/>
        
    </Container>
  );
}
