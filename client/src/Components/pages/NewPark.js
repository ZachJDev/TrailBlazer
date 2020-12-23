import React, { useEffect, useState } from "react";
import NewParkForm from "../NewParkForm";
import usePostBody from "../../hooks/usePostBody";

export default function NewPark({history}) {
  const [formErrors, setFormErrors] = useState([]);
  const [payload, setBody] = usePostBody("/park/new?_method=POST");

  useEffect(() => {
    setFormErrors(payload.errors);
    if(payload.status === 401) { // Not Authorized
      history.push('/home')
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
