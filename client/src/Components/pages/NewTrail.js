import React, {useEffect, useState} from "react";
import NewTrailForm from "../NewTrailForm";
import usePostBody from '../../hooks/usePostBody'

export default function NewTrail({match, location}) {
  //Deconstruct url query
  const queries = location.search.split('&')
  const keyPairs = queries.map(q => q.split('='))
  // Hard coding for now... may refactor later to be more flexible,
  // Don't see the value atm
  const params = {
    parkId: keyPairs[0][1],
    parkName: keyPairs[1][1]
  }


  const [formErrors, setFormErrors] = useState([]);
  const [payload, setBody] = usePostBody("/trail/new?_method=POST");

  useEffect(() => {
    setFormErrors(payload.errors);
  }, [payload]);

  const handleFormSubmit = (form) => {
    setBody(form);
  };

  return (
    <div>
      <h1>New Trail for {params.parkName}</h1>
      <NewTrailForm handleSubmit={handleFormSubmit} missing={formErrors}/>
    </div>
  );
}
