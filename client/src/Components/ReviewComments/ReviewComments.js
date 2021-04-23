import React, {useEffect, useState, useContext} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import CommentTree from './CommentTree';

import './ReviewComments.css';
import Button from 'react-bootstrap/Button';
import usePostBody from '../../hooks/usePostBody';
import useBool from '../../hooks/useBool';
import CommentEditMode from './CommentEditMode';

import {ReviewContext} from '../../contexts/ReviewContext';
import {UserContext} from '../../contexts/UserContext';

const DEFAULT_DEPTH = 3;
const DEFAULT_SHOWN = 3;

export default function ReviewComments({ fetchComments = false, commentArray = []}) {
    const {reviewId} = useContext(ReviewContext);
    const {user} = useContext(UserContext)
    const [total, setTotal] = useState(0);
    const [comments, setComments] = useState(commentArray);
    const [shown, setShown] = useState(DEFAULT_SHOWN);
    const [getComments] = useGetPayload(`/comments/byReviewId/${reviewId}`);
    const [postNewComment] = usePostBody('/comments/add')
    const [isAdding, flipAdding] = useBool(false)
    const [newCommentText, setNewCommentText] = useState('');



    useEffect(() => {
        getComments().then(commentsRes => {
            setComments(commentsRes.comments);
            setTotal(commentsRes.total);
        });
    }, []);

    const handlePostNewComment = async () => {
        const newCommentRes = await postNewComment({
            text:newCommentText,
            parentId: null,
            reviewId,
            userId: user.userId});
        const commentRes = await getComments();
        setComments(commentRes.comments)
        setShown(commentRes.total)
        setTotal(commentRes.total)
        flipAdding();
    }

    const handleCancelNewComment = () => {
        setNewCommentText("");
        flipAdding();
    }

    const handleNewCommentText = (e) => {
        e.preventDefault();
        setNewCommentText(e.target.value)
    }

    const handleShowMore = () => {
        setShown(shown + 2);
    };
    return (
        <React.Fragment>
            {!isAdding ? <Button onClick={flipAdding}>Add new Comment</Button>
                : <CommentEditMode className={'new-comment-editing'}
                                   text={newCommentText}
                                   cancelOnClick={handleCancelNewComment}
                                   submitOnClick={handlePostNewComment}
                                   handleText={handleNewCommentText}/>}

            {comments.length > 0 ?
                <React.Fragment>
                <CommentTree comments={comments} depth={DEFAULT_DEPTH} numShown={shown}/>
                    {shown < total ?
                    <Button onClick={handleShowMore}>Show More</Button>
                    : null
                }
        </React.Fragment>
                : null}

        </React.Fragment>
    );
}