import React, {useEffect, useState, useContext} from 'react'

import {UserContext} from '../../contexts/UserContext'


export default function Logout() {

    const [payload, setPayload] = useState({})
    const {clearUser} = useContext(UserContext)

    
    useEffect(() => {
        async function logUserOut () {

            const res = await fetch('/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
            const ret = await res.json()
            setPayload({...ret})
            if(ret.success) {
                clearUser(null)
            }
        }
        logUserOut();
    }, [])

    return (
        <div>
        { payload.success ?

        <h2>Successfully Logged out.</h2>

        : <h2>Logging you out...</h2>


        }
            
        </div>
    )
}
