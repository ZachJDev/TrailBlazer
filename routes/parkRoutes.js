const express = require("express");
const { getUser, userIsAdmin } = require("../middleware/middleware");
const router = express.Router({ mergeParams: true });

const parkController = require("../controllers/ParkController");

// Update
router.put("/:parkId/edit", getUser, userIsAdmin, parkController.update);

// Read
router.get("/:parkId([0-9]+$)", parkController.getOne);

// Create
router.post("/new", getUser, userIsAdmin, parkController.add);

// Destroy
router.delete("/delete/:parkId", getUser, userIsAdmin, parkController.delete);

module.exports = router;