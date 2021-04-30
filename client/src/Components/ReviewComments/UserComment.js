import React, {useContext} from 'react';

// Components
import CommentHeader from './CommentHeader';
import CommentEditMode from './CommentEditMode';
import FlexWrapper from '../Wrappers/FlexWrap';
import CommentReplyMode from './CommentReplyMode';
import {faEdit, faReply, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Contexts
import {ReviewContext} from '../../contexts/ReviewContext';
import {UserContext} from '../../contexts/UserContext';

// Hooks
import useInputState from '../../hooks/useInputState';
import useBool from '../../hooks/useBool';
import useAddComment from '../../hooks/comments/useAddComment';
import useEditComment from '../../hooks/comments/useEditComment';

// Style
import './UserComment.css';
import './Comment.css';
import useDeleteComment from '../../hooks/comments/useDeleteComment';

export default function UserComment({comment, depth}) {
    const [text, setText] = useInputState(comment.text);
    const [isEditing, flipIsEditing] = useBool(false);
    const [isReplying, flipIsReplying] = useBool(false);
    const {reviewId, refreshComments} = useContext(ReviewContext);
    const {user} = useContext(UserContext);
    const sendEdit = useEditComment();
    const sendReply = useAddComment();
    const sendDelete = useDeleteComment();

    const resetText = () => {
        setText(comment.text);
        flipIsEditing();
    };

    const handleEdit = async () => {
        const editRequest = await sendEdit({text, commentId: comment.commentId, userId: comment.user.userId, reviewId});
        if (editRequest.success) {
            // refreshCommentSection()
            flipIsEditing();
        }
    };

    const handleReply = async (replyText) => {
      await sendReply({
            text: replyText,
            parentId: comment.commentId,
            userId: user.userId,
            reviewId: reviewId,
        });
    };

    const handleDelete = async () => {
        await sendDelete({commentId: comment.commentId, userId: comment.user.userId});
        await refreshComments();
    };

    let commentComponent;

    if (isEditing) {
        commentComponent =
            <CommentEditMode text={text} handleText={setText} submitOnClick={handleEdit} cancelOnClick={resetText}/>;
    } else if (isReplying) {
        commentComponent = <CommentReplyMode submitOnClick={handleReply} text={text} cancelReply={flipIsReplying}/>;
    } else {
        commentComponent = <FlexWrapper direction={'column'}>
            <p className={'text'}>{text}</p>
            <FlexWrapper className={'comment-actions'}>
                <span onClick={flipIsReplying}><FontAwesomeIcon icon={faReply}/> Reply</span>
                <span onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/> Delete</span>
                <span><FontAwesomeIcon className={'comment_edit-icon'} onClick={flipIsEditing}
                                       icon={faEdit}/> Edit</span>
            </FlexWrapper>
        </FlexWrapper>;
    }
    return (
        <div className={`comment level-${depth}`}>
            <CommentHeader author={comment.user.username}
                           created={comment.updatedAt}
            />
            {commentComponent}
        </div>
    );
}