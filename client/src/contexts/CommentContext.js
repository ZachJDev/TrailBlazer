import React, { createContext, useEffect, useState } from "react";

export const CommentContext = createContext(null);

export function CommentProvider({ children, id, author, text }) {
  const [commentId, setId] = useState(0);
  const [commentText] = useState(text);
  const [commentAuthor] = useState(author);

  useEffect(() => {
    setId(id);
  }, [id]);

  return (
    <CommentContext.Provider
      value={{ commentId, setId, commentText, commentAuthor }}
    >
      {children}
    </CommentContext.Provider>
  );
}