import React, {useState, useEffect, useContext} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import ProfileHeader from '../Profile/ProfileHeader';
import useBool from '../../hooks/useBool';
import ProfileReviews from '../Profile/ProfileReviews';
import ProfileBio from '../Profile/ProfileBio'
import Col from 'react-bootstrap/Col';
import withHeader from '../../HigherOrderComponents/withHeader';

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
            {withHeader(<ProfileReviews userId={userInfo.userId} username={userInfo.username}/>, `${userInfo.username}'s reviews:`, 'header')}
        </Col>
            : null
    );
}
