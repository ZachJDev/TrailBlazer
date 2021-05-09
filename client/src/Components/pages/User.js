import React, { useEffect, useState, useContext } from "react";
import {Button} from 'react-bootstrap';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import { Helmet } from "react-helmet";

import {UserContext} from '../../contexts/UserContext'
import useGetPayload from "../../hooks/useGetPayload";
import ProfileHeader from "../Profile/ProfileHeader";
import useBool from "../../hooks/useBool";
import ProfileReviews from "../Profile/ProfileReviews";
import ProfileBio from "../Profile/ProfileBio";
import Col from "react-bootstrap/Col";
import withHeader from "../../HigherOrderComponents/withHeader";

import useDeleteUser from '../../hooks/Users/useDeleteUser'


export default function User({ match, history }) {
  const [userInfo, setUserInfo] = useState(null);
  const [title, setTitle] = useState("TrailBlazer | Hike Your Way");
  const [isLoaded, flipIsloaded] = useBool(false);
  const [getUserInfo] = useGetPayload(`/user/${match.params.userId}`);
  const sendDelete = useDeleteUser(userInfo?.userId)

  useEffect(() => {
    getUserInfo().then((info) => {
      setUserInfo(info);
      setTitle(info.username);
    });
  }, []);

  const handleDelete = async () => {
      const deleteRes = await sendDelete();
      if(deleteRes.success) {history.push('/')}
      else {console.log(deleteRes.errors[0])}
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${title}'s Page`}</title>
      </Helmet>
      {userInfo !== null ? (
        <Col>
          <ProfileHeader userInfo={userInfo} handleDelete={handleDelete} />
          <ProfileBio bio={userInfo.bio} />
          {withHeader(
            <ProfileReviews
              userId={userInfo.userId}
              username={userInfo.username}
            />,
            `${userInfo.username}'s reviews:`,
            "header"
          )}
        </Col>
      ) : null}
    </React.Fragment>
  );
}
