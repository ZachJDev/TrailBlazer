const express = require('express')
const router = express.Router({mergeParams: true})

const middleware = require('../middleware/middleware')
const reviewController = require('../controllers/reviewController')

// Read
router.get('/trails/:id', middleware.getUser, reviewController.checkUserForReview, reviewController.getTrailReviews)
router.get('/user/:userId', reviewController.getSingleReview) // seems redundant
router.get('/:id', middleware.getUser, reviewController.getById)
router.get('/search/:term', reviewController.getReviews)

// Create
router.post('/new', middleware.getUser, middleware.userMatches, reviewController.postNewTrailReview)

// Update
router.put('/edit', middleware.getUser, reviewController.updateReview)

// TODO: Destroy

module.exports = router