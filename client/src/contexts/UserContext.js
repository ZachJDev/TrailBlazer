import React, {createContext, useState, useEffect} from 'react'
import usePostBody from '../hooks/usePostBody'
export const UserContext = createContext()

export function UserProvider({children}) {
const [user, setUser] = useState({})
const [payload, postLogin] = usePostBody("/auth/login")

const updateUser = (form) => {
    postLogin(form)
}
useEffect(()=> {
    setUser(payload)
}, [payload])

    return (
        <UserContext.Provider value={{user, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}
