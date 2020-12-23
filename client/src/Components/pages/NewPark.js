import React, { useEffect, useState } from "react";
import NewParkForm from "../NewParkForm";
import usePostBody from "../../hooks/usePostBody";

export default function NewPark({history}) {
  const [formErrors, setFormErrors] = useState([]);
  const [payload, setBody] = usePostBody("/park/new");

  useEffect(() => {
    setFormErrors(payload.errors);
    console.log(payload.status)
    if(payload.status === 401) { // Not Authorized
      history.push('/home')
    }
    else if(payload.status === 200) {
      history.push(`/park/${payload.parkid}`)
    }
  }, [payload]);

  const handleFormSubmit = (form) => {
    setBody(form);
  };

  return (
    <div>
      <NewParkForm handleSubmit={handleFormSubmit} missing={formErrors || []} />
    </div>
  );
}
