const express = require("express");
const router = express.Router({ mergeParams: true });

const { getUser, userMatches } = require("../middleware/middleware");
const reviewController = require("../controllers/reviewController");
const { userIsAdmin } = require("../middleware/middleware");

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

// TODO: Destroy

router.delete(
  "/Admin/delete/:reviewId",
  getUser,
  userIsAdmin,
  reviewController.delete
);

router.delete(
  "/delete/:reviewId",
  getUser,
  userMatches,
  reviewController.delete
);

module.exports = router;