const express = require('express')
const router = express.Router({mergeParams: true})

const ratingController =require('../controllers/ratingController')

router.get('/trail/:id([0-9]+$)', ratingController.getTrailRatings)

module.exports = router