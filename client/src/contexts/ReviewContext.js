import React, { createContext, useEffect, useState } from "react";
import useGetPayload from "../hooks/useGetPayload";

export const ReviewContext = createContext(null);

export function ReviewProvider({ children, id }) {
  const [reviewId] = useState(id);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotal] = useState(0);
  const [getComments] = useGetPayload(`/comments/byReviewId/${id}`);

  const refreshComments = async () => {
    const commentRes = await getComments();
    setComments(commentRes.comments);
    setTotal(commentRes.total);
  };

  useEffect(() => {
    async function refresh() {
      await refreshComments();
    }

    refresh().then(() => {});
  }, []);

  return (
    <ReviewContext.Provider
      value={{ reviewId, comments, totalComments, refreshComments }}
    >
      {children}
    </ReviewContext.Provider>
  );
}