import React, {useContext} from 'react';
import './Comment.css'

import CommentHeader from './CommentHeader'
import CommentReplyMode from './CommentReplyMode'
import FlexWrapper from '../Wrappers/FlexWrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faReply, faTrash} from '@fortawesome/free-solid-svg-icons';
import useBool from '../../hooks/useBool';
import usePostBody from '../../hooks/usePostBody';
import {ReviewContext} from '../../contexts/ReviewContext';
import {CommentContext} from '../../contexts/CommentContext';
import {UserContext} from '../../contexts/UserContext';


export default function Comment({comment, depth, children}) {
const [isReplying, flipIsReplying] = useBool(false);
const [postReply] = usePostBody('/comments/add');
const {reviewId} = useContext(ReviewContext);
const {user} = useContext(UserContext);

const commentAuthor = comment.user.username;
const commentText = comment.text;


const handleReply = async (replyText) => {
        const replyRes =  await postReply({text: replyText,
            parentId: comment.commentId,
            userId: user.userId,
            reviewId: reviewId})
    }

    return(
        <div className={`comment level-${depth}`}>
            <CommentHeader author={commentAuthor} created={comment.updatedAt}/>
            {
                isReplying ?
                    <CommentReplyMode text={commentText} submitOnClick={handleReply} cancelReply={flipIsReplying}/>
                    :<React.Fragment>
                    <p className={"text"}>{commentText}</p>
                    <FlexWrapper className={"non-user-comment-actions"}>
                    <span onClick={flipIsReplying}><FontAwesomeIcon icon={faReply}/> Reply</span>
                </FlexWrapper>
                    </React.Fragment>
            }
        </div>
    )
}