const express = require('express')
const db = require("../models/index")
const {getUser, userIsAdmin} = require('../middleware/middleware')
const router = express.Router({mergeParams: true})
const trailController = require('../controllers/trailController')

// Update
router.put(`/:trailId/edit`, getUser, userIsAdmin, trailController.update)

// Read
router.get(`/:id([0-9]+$)`, trailController.getOne)

// Create
router.post('/new', trailController.new)

// TODO: Destroy


module.exports = router