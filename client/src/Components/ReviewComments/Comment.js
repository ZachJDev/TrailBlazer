import React, { useContext } from "react";
import "./Comment.css";

import CommentHeader from "./CommentHeader";
import CommentReplyMode from "./CommentReplyMode";
import FlexWrapper from "../Wrappers/FlexWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import useBool from "../../hooks/useBool";
import { ReviewContext } from "../../contexts/ReviewContext";
import { UserContext } from "../../contexts/UserContext";
import { useMutation } from "react-query";
import { postNewComment } from "../../API/API";

export default function Comment({ comment, depth }) {
  const [isReplying, flipIsReplying] = useBool(false);
  const { reviewId, refreshComments } = useContext(ReviewContext);
  const { user } = useContext(UserContext);

  const commentAuthor = comment.user.username;
  const commentText = comment.text;

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

  const handleReply = async (replyText) => {
    await submitReply.mutate({
      text: replyText,
      parentId: comment.commentId,
      userId: user.userId,
      reviewId: reviewId,
    });
  };

  return (
    <div className={`comment level-${depth}`}>
      <CommentHeader author={commentAuthor} created={comment.updatedAt} />
      {isReplying ? (
        <CommentReplyMode
          text={commentText}
          submitOnClick={handleReply}
          cancelReply={flipIsReplying}
        />
      ) : (
        <React.Fragment>
          <p className={"text"}>{commentText}</p>
          {user.isLoggedIn && (
            <FlexWrapper className={"non-user-comment-actions"}>
              <span onClick={flipIsReplying}>
                <FontAwesomeIcon icon={faReply} /> Reply
              </span>
            </FlexWrapper>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
