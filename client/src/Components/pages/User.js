import React, { useState } from "react";
import { Helmet } from "react-helmet";

import ProfileHeader from "../Profile/ProfileHeader";

import ProfileReviews from "../Profile/ProfileReviews";
import ProfileBio from "../Profile/ProfileBio";
import Col from "react-bootstrap/Col";
import withHeader from "../../HigherOrderComponents/withHeader";

import { useMutation, useQuery } from "react-query";
import { deleteUser, getUserData } from "../../API/API";

export default function User({ match, history }) {
  const [userInfo, setUserInfo] = useState(null);
  const [title, setTitle] = useState("TrailBlazer | Hike Your Way");
  const { userId } = match.params;

  const submitDelete = useMutation(
    ["deleteUser", userId],
    () => deleteUser(userId)(),
    {
      onSuccess: (deleteRes) => {
        if (deleteRes.success) {
          history.push("/");
        } else {
          // TODO: handle User Delete Error
          alert("Something went wrong. Please try again later.");
        }
      },
    }
  );

  const { isLoading, isError } = useQuery(
    ["getUserData", userId],
    getUserData(userId),
    {
      onSuccess: (info) => {
        setUserInfo(info);
        setTitle(info.username);
      },
    }
  );
  const handleDelete = async () => {
    submitDelete.mutate(userId);
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    return <h2>Something went wrong.. Please try again later</h2>;
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
