const express = require('express');
const {getUser, userIsAdmin, validateReq} = require('../middleware/middleware');
const router = express.Router({mergeParams: true});

const parkController = require('../controllers/ParkController');

// Update
router.put('/:parkId/edit', getUser, userIsAdmin, parkController.update);

// Read
router.get('/:parkId([0-9]+$)', parkController.getOne);

// Create
router.post('/new',
    getUser,
    userIsAdmin,
    validateReq({body: ['name', 'address', 'state', 'city', 'zipCode', 'description']}),
    parkController.add);

// Destroy
router.delete('/delete/:parkId',parkController.delete);

module.exports = router;