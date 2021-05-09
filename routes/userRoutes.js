const express = require('express')
const {getUser, authDelete,} = require('../middleware/middleware')
const userController = require('../controllers/userController')
const router = express.Router({mergeParams: true})


router.get('/:userId', getUser, userController.getUserInfo)

// Delete

router.delete(
    "/delete/:userId",
    getUser,
    authDelete,
    userController.deleteUser
);

module.exports = router