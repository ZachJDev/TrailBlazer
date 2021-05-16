import React, { useContext } from "react";
import { useMutation } from "react-query";

// Components
import CommentHeader from "./CommentHeader";
import CommentEditMode from "./CommentEditMode";
import FlexWrapper from "../Wrappers/FlexWrapper";
import CommentReplyMode from "./CommentReplyMode";
import { faEdit, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Contexts
import { ReviewContext } from "../../contexts/ReviewContext";
import { UserContext } from "../../contexts/UserContext";

// Hooks
import useInputState from "../../hooks/useInputState";
import useBool from "../../hooks/useBool";

// Style
import "./UserComment.css";
import "./Comment.css";

// Routes
import { deleteComment, editComment, postNewComment } from "../../API/API";

export default function UserComment({ comment, depth }) {
  const [text, setText] = useInputState(comment.text);
  const [isEditing, flipIsEditing] = useBool(false);
  const [isReplying, flipIsReplying] = useBool(false);
  const { reviewId, refreshComments } = useContext(ReviewContext);
  const { user } = useContext(UserContext);

  const submitReply = useMutation(
    ["replyTo", comment.commentId],
    (body) => postNewComment(body)(),
    {
      onSuccess: (res) => {
        refreshComments();
      },
      onError: (res) => {
        alert("Something went wrong. Please try again later.");
      },
    }
  );
  const resetText = () => {
    setText(comment.text);
    flipIsEditing();
  };

  const submitEdit = useMutation(
    ["replyTo", comment.commentId],
    (body) => editComment(body)(),
    {
      onSuccess: (res) => {
        if (res.success) {
          flipIsEditing();
        }
      },
      onError: (res) => {
        alert("Something went wrong. Please try again later.");
      },
    }
  );

  const submitDelete = useMutation(
    ["replyTo", comment.commentId],
    (body) => deleteComment(body)(),
    {
      onSuccess: (res) => {
        refreshComments();
      },
      onError: (res) => {
        alert("Something went wrong. Please try again later.");
      },
    }
  );

  const handleEdit = async () => {
    await submitEdit.mutate({
      text,
      commentId: comment.commentId,
      userId: comment.user.userId,
      reviewId,
    });
  };

  const handleReply = async (replyText) => {
    await submitReply.mutate({
      text: replyText,
      parentId: comment.commentId,
      userId: user.userId,
      reviewId: reviewId,
    });
  };

  const handleDelete = async () => {
    await submitDelete.mutate({
      commentId: comment.commentId,
      userId: comment.user.userId,
    });
  };

  let commentComponent;

  if (isEditing) {
    commentComponent = (
      <CommentEditMode
        text={text}
        handleText={setText}
        submitOnClick={handleEdit}
        cancelOnClick={resetText}
      />
    );
  } else if (isReplying) {
    commentComponent = (
      <CommentReplyMode
        submitOnClick={handleReply}
        text={text}
        cancelReply={flipIsReplying}
      />
    );
  } else {
    commentComponent = (
      <FlexWrapper direction={"column"}>
        <p className={"text"}>{text}</p>
        <FlexWrapper className={"comment-actions"}>
          <span onClick={flipIsReplying}>
            <FontAwesomeIcon icon={faReply} /> Reply
          </span>
          <span onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </span>
          <span>
            <FontAwesomeIcon
              className={"comment_edit-icon"}
              onClick={flipIsEditing}
              icon={faEdit}
            />{" "}
            Edit
          </span>
        </FlexWrapper>
      </FlexWrapper>
    );
  }
  return (
    <div className={`comment level-${depth}`}>
      <CommentHeader
        author={comment.user.username}
        created={comment.updatedAt}
      />
      {commentComponent}
    </div>
  );
}
