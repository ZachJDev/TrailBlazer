import React, {createContext, useState, useEffect} from 'react'
import usePostBody from '../hooks/usePostBody'
export const UserContext = createContext()

export function UserProvider({children}) {
const [user, setUser] = useState({})
const [errors, setErrors] = useState({})
const [payload, postLogin] = usePostBody("/auth/login")

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

    return (
        <UserContext.Provider value={{user, updateUser, errors}}>
            {children}
        </UserContext.Provider>
    )
}
