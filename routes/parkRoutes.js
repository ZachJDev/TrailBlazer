const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const parkController =require('../controllers/ParkController')

router.get('/:parkId', parkController.getOne) 

router.post('/new', (req, res, next) => {
    console.log(req.body)
})

module.exports = router;