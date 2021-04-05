import React, {createContext, useState, useEffect} from 'react'
import usePostBody from '../hooks/usePostBody'
import useGetPayload from '../hooks/useGetPayload'
export const UserContext = createContext()

export function UserProvider({children}) {
const [user, setUser] = useState({})
const [errors, setErrors] = useState({})
const [postLogin] = usePostBody("/auth/login")
const  [pl] = useGetPayload('/auth/userData')

const updateUser = (form) => {
    postLogin(form).then(payload => {
        if(payload.status === 200) {
            setUser(payload)
            setErrors({})
        }
        else {
            setErrors(payload)
        }
    })
}
const userExists = () => !(Object.keys(user).length === 0 && user.constructor === Object)
const clearUser = () => setUser({})

useEffect(() => {
    console.log('attempting to grab user info')
    // Check if the user object is empty
    if(Object.keys(user).length === 0 && user.constructor === Object) {
        pl().then(user => {
            setUser(user)
        })
    }
}, [])

    return (
        <UserContext.Provider value={{user, updateUser, errors, clearUser, userExists}}>
            {children}
        </UserContext.Provider>
    )
}
