import React, { useContext, useEffect, useState } from "react";
import CommentTree from "./CommentTree";

import "./ReviewComments.css";
import Button from "react-bootstrap/Button";
import usePostBody from "../../hooks/usePostBody";
import useBool from "../../hooks/useBool";
import CommentEditMode from "./CommentEditMode";

import { ReviewContext } from "../../contexts/ReviewContext";
import { UserContext } from "../../contexts/UserContext";

const DEFAULT_DEPTH = 3;
const DEFAULT_SHOWN = 2;

export default function ReviewComments() {
  const { reviewId, comments, totalComments, refreshComments } = useContext(
    ReviewContext
  );
  const { user } = useContext(UserContext);
  const [displayComments, setDisplayComments] = useState([]);
  const [shown, setShown] = useState(DEFAULT_SHOWN);
  const [postNewComment] = usePostBody("/comments/add");
  const [isAdding, flipAdding] = useBool(false);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    setDisplayComments(comments);
  }, [comments]);

  const handlePostNewComment = async () => {
    await postNewComment({
      text: newCommentText,
      parentId: null,
      reviewId,
      userId: user.userId,
    });
    await refreshComments();
    setShown(totalComments);
    flipAdding();
  };

  const handleCancelNewComment = () => {
    setNewCommentText("");
    flipAdding();
  };

  const handleNewCommentText = (e) => {
    e.preventDefault();
    setNewCommentText(e.target.value);
  };

  return (
    <React.Fragment>
      {user.isLoggedIn &&
        (!isAdding ? (
          <Button onClick={flipAdding}>Add new Comment</Button>
        ) : (
          <CommentEditMode
            className={"new-comment-editing"}
            text={newCommentText}
            cancelOnClick={handleCancelNewComment}
            submitOnClick={handlePostNewComment}
            handleText={handleNewCommentText}
          />
        ))}

      {displayComments.length > 0 ? (
        <CommentTree
          comments={displayComments}
          maxDepth={DEFAULT_DEPTH}
          numShown={shown}
        />
      ) : null}
    </React.Fragment>
  );
}
