const express = require('express')
const {getUser} = require("../middleware/middleware")
const router = express.Router({mergeParams: true})

const parkController =require('../controllers/ParkController')

router.get('/:parkId([0-9]+$)',  parkController.getOne) 

router.post('/new', getUser, parkController.add)

module.exports = router;