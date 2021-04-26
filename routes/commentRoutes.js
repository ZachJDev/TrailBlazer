const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})
const commentController = require('../controllers/commentController');
const middleware = require('../middleware/middleware')

router.get("/byReviewId/:reviewId", middleware.getUser, commentController.getByReviewId)

router.get("/MultipleReviews", middleware.getUser, commentController.getMultipleReviews);

router.post("/add", middleware.getUser, middleware.userMatches, commentController.postNewComment)

router.put('/update', middleware.getUser, middleware.userMatches, commentController.updateComment)

router.delete("/delete", middleware.getUser, middleware.userMatches, commentController.deleteComment)

module.exports = router;