import React, {  useState } from "react";
import NewTrailForm from "../NewTrailForm";
import usePostBody from "../../hooks/usePostBody";

export default function NewTrail({ location, history }) {
  //Deconstruct url query
  const keyPairs = location.search.split("&").map((q) => q.split("="));
  // Hardcoding for now... may refactor later to be more flexible
  const params = {
    parkId: keyPairs[0][1],
    parkName: keyPairs[1][1],
  };

  const [formErrors, setFormErrors] = useState([]);
  const [setBodyAndPost] = usePostBody("/trail/new?_method=POST");

  const handleFormSubmit = (form) => {
    setBodyAndPost(form).then(payload => {
      if(payload.status !== 200) setFormErrors(payload.errors);
      else {
        history.push(`/trail/${payload.trailId}`)
      }
    })
  };

  return (
    <div>
      <h1>New Trail for {params.parkName}</h1>
      <NewTrailForm
        handleSubmit={handleFormSubmit}
        missing={formErrors}
        park={params.parkId}
      />
    </div>
  );
}
