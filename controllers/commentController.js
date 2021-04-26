const db = require('../models/index');

exports.getByReviewId = (req, res, next) => {
    db.Comment.findByReviewId(req.params.reviewId, req.user)
        .then(comments => {
            res.json(comments);
        });
};

exports.getMultipleReviews = (req, res, next) => {
    const reviewIds = req.query.ids
        .split(',')
        .map(id => parseInt(id));
    db.Comment.findByMultipleReviewIds(reviewIds, req.user)
        .then(comments => {
            res.json(comments);
        });
};

exports.postNewComment = (req, res, next) => {
    const {text, parentId, reviewId} = req.body
    console.log(text, parentId, reviewId)
    if(req.user.matchesRequest) {
    db.Comment.addComment({text, parentId, userId: req.user.userId, reviewId})
        .then(commentRes => {
            res.json(commentRes)
        })
    } else {
        res.json({success: false,
            errors: ["User is not correctly authenticated on server. Please log in again and try again"]})
    }
}

exports.updateComment = (req, res, next) => {
    db.Comment.updateComment(req.body.commentId, req.body.text, req.user.userId)
        .then(comment => {
            res.json(comment)
        })
}

exports.deleteComment  =  async (req, res, next) => {
    const deleteRes = await db.Comment.deleteComment(req.body.commentId, req.body.userId)
    res.json(deleteRes)
}