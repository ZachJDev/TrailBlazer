import React from "react";

import HomeSearch from '../Search/HomeSearch'
import AboutCards from '../Cards/AboutCards'

export default function Home({history}) {
  return (
    <React.Fragment>
        <div style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541296604437-8cb5efd2da96?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1991&q=80)",
          backgroundPosition: "center center",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          height: "82vh",
          width: '100%',
        }}
      >
    <HomeSearch history={history}/>
    </div> 
    <AboutCards/>
    </React.Fragment>
  );
}
