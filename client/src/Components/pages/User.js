import React, {useState, useEffect, useContext} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import ProfileHeader from '../Profile/ProfileHeader';
import useBool from '../../hooks/useBool';
import ProfileReviews from '../Profile/ProfileReviews';
import ProfileBio from '../Profile/ProfileBio'
import Col from 'react-bootstrap/Col';
import withHeader from '../../HigherOrderComponents/withHeader';
import {Helmet} from 'react-helmet';

export default function User({match}) {
    const [userInfo, setUserInfo] = useState(null)
    const [title, setTitle] = useState('TrailBlazer | Hike Your Way')
    const [isLoaded, flipIsloaded] = useBool(false)
    const [getUserInfo] = useGetPayload(`/user/${match.params.userId}`)

    useEffect(() => {
        getUserInfo().then(info => {
            setUserInfo(info);
            setTitle(info.username)
        })
    }, [])
    return (
        <React.Fragment>
            <Helmet>
                <title>{`${title}'s page`}</title>
            </Helmet>
            {userInfo !== null ?
                <Col>
                    <ProfileHeader user={userInfo}/>
                    <ProfileBio bio={userInfo.bio}/>
                    {withHeader(<ProfileReviews userId={userInfo.userId}
                                                username={userInfo.username}/>, `${userInfo.username}'s reviews:`, 'header')}
                </Col>
                : null}
        </React.Fragment>
    );
}
