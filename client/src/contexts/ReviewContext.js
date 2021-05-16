import React, { createContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllCommentsForReview } from "../API/API";

export const ReviewContext = createContext(null);

export function ReviewProvider({ children, id }) {
  const queryClient = useQueryClient();
  const [reviewId] = useState(id);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotal] = useState(0);

  useQuery(["getComments", id], getAllCommentsForReview(id), {
    onSuccess: (commentRes) => {
      setComments(commentRes.comments);
      setTotal(commentRes.total);
    },
    onError: () => {
      alert("something went Wrong, please try again");
    },
  });

  const refreshComments = async () => {
    await queryClient.refetchQueries(["getComments", id]);
  };

  return (
    <ReviewContext.Provider
      value={{ reviewId, comments, totalComments, refreshComments }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
