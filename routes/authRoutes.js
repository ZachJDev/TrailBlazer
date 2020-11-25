const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const authController = require('../controllers/authController')

router.get("/login", authController.postLogin)

module.exports = router