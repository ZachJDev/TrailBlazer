const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const authController = require('../controllers/authController')

router.post("/login", authController.postLogin)
router.post("/signup", authController.signUp)

module.exports = router