import React, {createContext, useState, useEffect} from 'react'
import usePostBody from '../hooks/usePostBody'
import useGetPayload from '../hooks/useGetPayload'
export const UserContext = createContext()

export function UserProvider({children}) {
const [user, setUser] = useState({})
const [errors, setErrors] = useState({})
const [payload, postLogin] = usePostBody("/auth/login")
const  [pl] = useGetPayload('/auth/userData')

const updateUser = (form) => {
    postLogin(form)
}
useEffect(()=> {
    if(payload.status === 200) {
        setUser(payload)
        setErrors({})
    }
    else {
        setErrors(payload)
    }
}, [payload])

useEffect(() => {
    // Check if the user object is empty
    if(Object.keys(user).length === 0 && user.constructor === Object) {
        setUser(pl)
    }
}, [pl])

    return (
        <UserContext.Provider value={{user, updateUser, errors}}>
            {children}
        </UserContext.Provider>
    )
}
