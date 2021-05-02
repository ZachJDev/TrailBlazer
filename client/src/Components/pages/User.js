import React, {useState, useEffect, useContext} from 'react';
import useGetPayload from '../../hooks/useGetPayload';

export default function User({match}) {
    const [userInfo, setUserInfo] = useState({})
    const [getUserInfo] = useGetPayload(`/user/${match.params.userId}`)

    useEffect(() => {
        getUserInfo().then(info => {
            setUserInfo(info);
        })
    }, [])

    console.log(userInfo)

    return (
        <div>
            <p>User</p>
        </div>
    );
}
