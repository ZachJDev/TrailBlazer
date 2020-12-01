const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const reviewController = require('../controllers/reviewController')

router.get('/trails/:id', reviewController.getTrailReviews)

router.post('/new', reviewController.postNewTrailReview)

module.exports = router