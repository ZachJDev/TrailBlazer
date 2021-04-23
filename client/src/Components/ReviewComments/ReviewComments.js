import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import CommentTree from './CommentTree';

import './ReviewComments.css';
import Button from 'react-bootstrap/Button';

const DEFAULT_DEPTH = 3;
const DEFAULT_SHOWN = 3;

export default function ReviewComments({reviewId, fetchComments = false, commentArray = []}) {
    const [total, setTotal] = useState(0);
    const [comments, setComments] = useState(commentArray);
    const [shown, setShown] = useState(DEFAULT_SHOWN);
    const [getComments] = useGetPayload(`/comments/byReviewId/${reviewId}`);

    useEffect(() => {
        getComments().then(commentsRes => {
            setComments(commentsRes.comments);
            setTotal(commentsRes.total);
        });
    }, []);

    const handleShowMore = () => {
        setShown(shown + 2);
    };
    return (
        comments.length > 0 ?
            <React.Fragment>
                <CommentTree comments={comments} depth={DEFAULT_DEPTH} numShown={shown}/>
                {
                    shown < total ?
                        <Button onClick={handleShowMore}>Show More</Button>
                        : null

                }

            </React.Fragment>
            : <p>There's Nothing Here!</p>
    );
}