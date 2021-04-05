const express = require('express')
const {getUser} = require("../middleware/middleware")
const router = express.Router({mergeParams: true})

const parkController =require('../controllers/ParkController')

router.get('/:parkId([0-9]+$)',  parkController.getOne) 

router.post('/new', getUser, parkController.add)

router.put("/edit",  getUser, parkController.update)

module.exports = router;