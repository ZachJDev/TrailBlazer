const express = require('express')
const {getUser, userIsAdmin,} = require('../middleware/middleware')
const userController = require('../controllers/userController')
const router = express.Router({mergeParams: true})


router.get('/:userId', getUser, userController.getUserInfo)

module.exports = router