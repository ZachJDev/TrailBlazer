import React, { useState } from "react";
import FlexWrapper from "../Wrappers/FlexWrapper";
import Button from "react-bootstrap/Button";

export default function CommentEditMode({
  text = "",
  cancelReply,
  className,
  submitOnClick,
}) {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = async () => {
    await submitOnClick(replyText);
    cancelReply();
  };

  const handleText = (e) => {
    setReplyText(e.target.value);
  };
  return (
    <div className={className}>
      <p>{text}</p>
      <textarea
        className={"edit-area"}
        value={replyText}
        onChange={handleText}
      />
      <FlexWrapper className={"edit-buttons"}>
        <Button onClick={handleSubmit} className={"button submit"}>
          Submit
        </Button>
        <Button
          className={"button cancel"}
          variant={"warning"}
          onClick={cancelReply}
        >
          Cancel
        </Button>
      </FlexWrapper>
    </div>
  );
}
