import React from 'react'
import CommentHeader from './CommentHeader'
import useInputState from '../../hooks/useInputState';
import useBool from '../../hooks/useBool';
import CommentEditMode from './CommentEditMode';
import FlexWrapper from '../Wrappers/FlexWrap';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import './UserComment.css'
import './Comment.css'

export default function UserComment({comment, depth}) {
    const [text, setText] =  useInputState(comment.text);
    const [isEditing, flipIsEditing] = useBool(false);

    const resetText = () => {
        setText(comment.text);
        flipIsEditing();
    }
    return(
        <div className={`comment level-${depth}`}>
            <CommentHeader author={comment.user.username}
                           created={comment.updatedAt}
                           isEditable={true}
                           handleEdit={flipIsEditing}
            />
            {
                isEditing ?
                    <CommentEditMode text={text} handleText={setText} cancelOnClick={resetText}/>
                :  <FlexWrapper>
                        <p className={"text"}>{text}</p>
                        <span><FontAwesomeIcon className={"comment_edit-icon"} onClick={flipIsEditing} icon={faEdit}/> Edit comment</span>
                </FlexWrapper>

            }
        </div>
    )
}