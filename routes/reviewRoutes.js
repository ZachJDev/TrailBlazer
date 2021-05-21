const express = require("express");
const router = express.Router({ mergeParams: true });
const {TrailUserPair} = require('../models/index')

const {
  getUser,
  userMatches,
  authDelete,
} = require("../middleware/middleware");
const reviewController = require("../controllers/reviewController");

// Read
router.get(
  "/trails/:id",
  getUser,
  reviewController.checkUserForReview,
  reviewController.getTrailReviews
);
router.get("/user/:userId", reviewController.getSingleReview); // seems redundant
router.get("/:id", getUser, reviewController.getById);
router.get("/search/:term", reviewController.getReviews);

// Create
router.post("/new", getUser, userMatches, reviewController.postNewTrailReview);

// Update
router.put("/edit", getUser, reviewController.updateReview);

// Destroy

router.delete(
  "/delete/:reviewId",
  getUser,
  authDelete,
  reviewController.delete
);

// Testing Routes:

router.post('/test/review', reviewController.AddOrUpdateReview)

// router.get('/test/trailId',)


module.exports = router;