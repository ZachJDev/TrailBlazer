import React from 'react';
import Comment from './Comment';

import './CommentTree.css';
import UserComment from './UserComment';

export default function CommentTree({comments, depth, currentDepth = 0, numShown}) {
    return (
        comments.length > 0 && depth > 0 ?
            comments.map(comment => (
                <div className={'comment-tree'} key={comment.key}>
                    {comment.key < numShown ?
                        <React.Fragment>
                            {comment.isEditable ? // Two components below because the UserComment seemed too complex.
                                <UserComment comment={comment} depth={currentDepth}/> :
                                <Comment comment={comment} depth={currentDepth}/>}
                            <CommentTree comments={comment.childComments}
                                         depth={depth - 1}
                                         currentDepth={currentDepth + 1}
                                         numShown={numShown}/>
                        </React.Fragment> : null}
                </div>
            ))
            : null

    );
}