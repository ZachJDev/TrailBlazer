import React, { useContext } from "react";
import ProfileUsername from "./ProfileUsername";
import "./ProfileHeader.css";
import FlexWrapper from "../Wrappers/FlexWrapper";
import { Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

export default function ProfileHeader({ userInfo, handleDelete }) {
  const { user } = useContext(UserContext);
  return (
    <React.Fragment>
      <FlexWrapper
        direction={"column"}
        justifyContent={"center"}
        className={"profile-header"}
      >
        <FlexWrapper justifyContent={"center"}>
          <div className={"picture-holder"}></div>
          <ProfileUsername name={userInfo.username} />
        </FlexWrapper>
        {(userInfo.userId === user.userId || user.isAdmin) && (
          <Button
            onClick={handleDelete}
            variant={"warning"}
            className={"button_delete-user"}
          >
            {" "}
            Delete User
          </Button>
        )}
      </FlexWrapper>
    </React.Fragment>
  );
}