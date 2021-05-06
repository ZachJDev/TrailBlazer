const express = require('express')
const router = express.Router({mergeParams: true})

const authController = require('../controllers/authController')
const {userIsAdmin} = require('../middleware/middleware');
const {userMatches} = require('../middleware/middleware');
const {getUser} = require('../middleware/middleware');

// Login
router.post("/login", authController.postLogin)

// Sign up
router.post("/signup", authController.signUp)

// User Data
router.get("/UserData", authController.getUserData)

// Logout
router.post("/logout", authController.logout)

// TODO: Delete User

router.delete('/delete/:userId', getUser, userMatches, authController.deleteUser)

router.delete('/Admin/delete/:userId', getUser, userIsAdmin, authController.deleteUser)

module.exports = router