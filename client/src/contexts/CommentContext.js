import React, {createContext, useState, useEffect} from 'react'
export const CommentContext = createContext()

export function CommentProvider({children, id, author, text}) {
    const [commentId, setId] = useState(0)
    const [commentText, setText] = useState(text)
    const [commentAuthor, setAuthor] = useState(author)

    useEffect(() => {
        setId(id)
    }, [id]);


    return (
        <CommentContext.Provider value={{commentId, setId, commentText, commentAuthor}}>
            {children}
        </CommentContext.Provider>
    )
}