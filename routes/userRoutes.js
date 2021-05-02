const express = require('express')
const {getUser, userIsAdmin} = require('../middleware/middleware')
const router = express.Router({mergeParams: true})



module.exports = router