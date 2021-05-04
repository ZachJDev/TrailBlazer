import React from 'react'
import ProfileUsername from './ProfileUsername';
import './ProfileHeader.css'
import FlexWrapper from '../Wrappers/FlexWrap';
export default function ProfileHeader({user}) {
    return (
        <FlexWrapper justifyContent={'center'} className={"profile-header"}>
            <div className={'picture-holder'}></div>
        <ProfileUsername name={user.username}/>
        </FlexWrapper>
    )
}