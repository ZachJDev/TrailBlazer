const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const parkController =require('../controllers/ParkController')

router.get('/:parkId', parkController.getOne) 


module.exports = router;