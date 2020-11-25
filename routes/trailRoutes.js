const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})
const trailController = require('../controllers/trailController')

router.get(`/:id([0-9]+$)`, trailController.getOne)

router.post('/new', trailController.new)


module.exports = router