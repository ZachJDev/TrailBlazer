import React from "react";

export default function ProfileUsername({ name }) {
  return (
    <div>
      <h1 className={"profile-username"}>{name}</h1>
    </div>
  );
}