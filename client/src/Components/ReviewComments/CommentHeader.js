import React from "react";
import FlexWrapper from "../Wrappers/FlexWrapper";

import "./CommentHeader.css";

export default function CommentHeader({ author, created }) {
  const updatedAt = new Date(created).toLocaleDateString();
  return (
    <FlexWrapper className={"comment-header"}>
      <div>
        <h3 className={"author"}>{author} says:</h3>
      </div>
      <h3 className={"created-date"}>{updatedAt}</h3>
    </FlexWrapper>
  );
}
