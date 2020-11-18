import React from "react";
import NewParkForm from "../NewParkForm";

export default function NewPark() {
  let formErrors = [];

  const handleFormSubmit = (form) => {
    console.log(form)
    let body;
    let status;
    // I think this should actually be a put request
    fetch("/park/new?_method=POST", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((resBody) => {
        body = resBody;
        if (status !== 200) throw new Error();
      })
      .catch((e) => {
        if (status === 400) {
          formErrors = body.errors;
        }
        if (status === 409) {
          console.log(body.errors);
        }
      });
  };

  return (
    <div>
      <NewParkForm handleSubmit={handleFormSubmit} missing={formErrors} />
    </div>
  );
}
