import React, {useEffect, useState} from "react";
import NewParkForm from "../NewParkForm";
import usePostBody from '../../hooks/usePostBody'
export default function NewPark() {
  const [formErrors, setFormErrors] = useState([]);

const [payload, isLoaded, isFailed, setBody] = usePostBody("/park/new?_method=POST")

useEffect(() => {
  console.log(payload)
  setFormErrors(payload.errors)
}, [payload])


const handleFormSubmit = (form) => {
    setBody(form)
  };

  return (
    <div>
      <NewParkForm handleSubmit={handleFormSubmit} missing={formErrors || []} />
    </div>
  );
}
