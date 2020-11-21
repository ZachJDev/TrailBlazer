import React from "react";

export default function InfoContainer({
  name,
  description,
  address,
  zipcode,
  city,
  state,
}) {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <p>{address}</p>
        <p>
          {city}, {state}
        </p>
      </div>
      <p>{description}</p>
    </div>
  );
}
