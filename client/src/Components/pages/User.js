import React, {useState, useEffect, useContext} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import ProfileHeader from '../Profile/ProfileHeader';
import useBool from '../../hooks/useBool';
import ProfileReviews from '../Profile/ProfileReviews';
import ProfileBio from '../Profile/ProfileBio'
import Col from 'react-bootstrap/Col';

export default function User({match}) {
    const [userInfo, setUserInfo] = useState(null)
    const [isLoaded, flipIsloaded] = useBool(false)
    const [getUserInfo] = useGetPayload(`/user/${match.params.userId}`)

    useEffect(() => {
        getUserInfo().then(info => {
            console.log(info)
            setUserInfo(info);
        })
    }, [])
    if(userInfo !== null) console.log(userInfo?.userId)
    return (
        userInfo !== null ?
        <Col>
            <ProfileHeader user={userInfo}/>
            <ProfileBio bio={userInfo.bio}/>
            <ProfileReviews userId={userInfo.userId}/>
        </Col>
            : null
    );
}
