import React, { useState } from "react";
import NewParkForm from "../NewParkForm";
import usePostBody from "../../hooks/usePostBody";

export default function NewPark({history}) {
  const [formErrors, setFormErrors] = useState([]);
  const [setBody] = usePostBody("/park/new");

  const handleFormSubmit = (form) => {
    setBody(form).then(payload => {
      setFormErrors(payload.errors);
      console.log(payload.status)
      if(payload.status === 401) { // Not Authorized
        history.push('/home')
      }
      else if(payload.status === 200) {
        history.push(`/park/${payload.parkid}`)
      }
    });
  };

  return (
    <div>
      <NewParkForm handleSubmit={handleFormSubmit} missing={formErrors || []} />
    </div>
  );
}
