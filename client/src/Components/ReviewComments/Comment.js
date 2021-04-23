import React from 'react'
import './Comment.css'

import CommentHeader from './CommentHeader'


export default function Comment({comment, depth, children}) {

    return(
        <div className={`comment level-${depth}`}>
            <CommentHeader author={comment.user.username} created={comment.updatedAt}/>
            <p className={"text"}>{comment.text}</p>
        </div>
    )
}