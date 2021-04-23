import React, {createContext, useState} from 'react'
export const ReviewContext = createContext()

export function ReviewProvider({children, id}) {
    const [reviewId] = useState(id)

    return (
        <ReviewContext.Provider value={{reviewId}}>
            {children}
        </ReviewContext.Provider>
    )
}