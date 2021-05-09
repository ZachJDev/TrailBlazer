const express = require('express')
const {getUser, userIsAdmin, authDelete} = require('../middleware/middleware')
const router = express.Router({mergeParams: true})
const trailController = require('../controllers/trailController')

// Update
router.put(`/:trailId/edit`, getUser, userIsAdmin, trailController.update)

// Read
router.get(`/:id([0-9]+$)`, trailController.getOne)

// Create
router.post('/new', trailController.new)

// Destroy

router.delete('/delete/:trailId', getUser, authDelete, trailController.delete)


module.exports = router