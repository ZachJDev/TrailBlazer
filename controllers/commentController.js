const db = require('../models/index');

exports.getByReviewId = async (req, res, next) => {
    try {
        const comments = await db.Comment.findByReviewId(req.params.reviewId, req.user);
        res.json({payload: comments, success: true});
    } catch (e) {
        res.json({success: false});
    }

};

// exports.getMultipleReviews = async (req, res, next) => {
//     const reviewIds = req.query.ids.split(',').map((id) => parseInt(id));
//     const comments = await db.Comment.findByMultipleReviewIds(reviewIds, req.user);
//     res.json(comments);
//
// };

exports.postNewComment = async (req, res, next) => {
    const {text, parentId, reviewId} = req.body;
    try {
        const commentRes = await db.Comment.addComment({
            text,
            parentId,
            userId: req.user.userId,
            reviewId,
        });
        res.json({success: true, payload: commentRes});
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, errors: ['Something went Wrong.']});
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const {commentId, text} = req.body;
        const comment = await db.Comment.updateComment(
            commentId,
            text,
            req.user.userId,
        );
        res.json({payload: comment, success: true});
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false});
    }

};

exports.deleteComment = async (req, res, next) => {
    try {
        const deleteRes = await db.Comment.deleteComment(
            req.body.commentId,
            req.body.userId,
        );
        res.json({success: true, payload: deleteRes});
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false});
    }
};