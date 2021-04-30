const express = require('express')
const router = express.Router({mergeParams: true})

const authController = require('../controllers/authController')

// Login
router.post("/login", authController.postLogin)

// Sign up
router.post("/signup", authController.signUp)

// User Data
router.get("/UserData", authController.getUserData)

// Logout
router.post("/logout", authController.logout)

// TODO: Delete User

module.exports = router