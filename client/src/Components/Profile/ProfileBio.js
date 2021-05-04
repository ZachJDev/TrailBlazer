import React from 'react'
import './ProfileBio.css'
export default function ProfileBio({bio}) {
    return(
        <div className={"profile-bio"}>
            <h2 className={'bio-header'}>BIO:</h2>
        <p className={'bio-text'}>{bio}</p>
        </div>
    )
}