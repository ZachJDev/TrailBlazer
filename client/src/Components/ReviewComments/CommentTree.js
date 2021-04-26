import React, {useState} from 'react';
import Comment from './Comment';
import FlexWrapper from '../Wrappers/FlexWrap'
import './CommentTree.css';
import UserComment from './UserComment';

import {CommentProvider} from '../../contexts/CommentContext';
import Button from 'react-bootstrap/Button';

export default function CommentTree({comments, maxDepth, currentDepth = 0, numShown}) {
    const [depth, setDepth] = useState(maxDepth)
    const [shown, setShown] = useState(numShown);
    const showMoreReplies = comments.length > 0 && depth === 0 ?
        <div>
            <Button variant={"info"} className={`more-replies`} onClick={() => setDepth(depth + 1)}>Show Replies</Button>
        </div> : null

    const showMoreComments = comments.length > shown ?
        <div>
            <Button variant={"link"} className={"more-comments"} onClick={() => setShown(shown + 5)}>Show More</Button>
        </div> : null
    return (
        <React.Fragment>
            {comments.length > 0 && depth > 0 ?
                <React.Fragment>
                    {comments.map((comment, idx) => (
                <div className={'comment-tree'} key={comment.commentId}>
                    {idx < shown ?
                        <CommentProvider id={comment.commentId}>
                        <React.Fragment>
                            {comment.isEditable ? // Two components below because the UserComment seemed too complex.
                                <UserComment comment={comment} depth={currentDepth}/> :
                                <Comment comment={comment} depth={currentDepth}/>}
                            <CommentTree comments={comment.childComments}
                                         maxDepth={depth - 1}
                                         currentDepth={currentDepth + 1}
                                         numShown={numShown}/>
                        </React.Fragment>
                        </CommentProvider>
                            : null }
                </div>
            ))}
                    </React.Fragment>
            : null}

                <div className={` button-box button-box-comments level-${currentDepth}`}>
                    {comments.length > 0 && depth > 0 ? showMoreComments : null}
                </div>
            <div className={` button-box level-${currentDepth - 1}`}>
                    {showMoreReplies}
            </div>
        </React.Fragment>

    );
}