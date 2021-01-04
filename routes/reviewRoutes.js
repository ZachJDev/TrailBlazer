const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const middleware = require('../middleware/middleware')
const reviewController = require('../controllers/reviewController')

router.get('/trails/:id', middleware.getUser, reviewController.checkUserForReview, reviewController.getTrailReviews)

router.get('/user/:userId', reviewController.getSingleReview)

router.post('/new', middleware.getUser, middleware.userMatches, reviewController.postNewTrailReview)

router.put('/edit', middleware.getUser, reviewController.updateReview)

module.exports = router