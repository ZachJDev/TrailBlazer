const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");
const {getUser, userMatches} = require("../middleware/middleware");

router.get(
  "/byReviewId/:reviewId",
  getUser,
  commentController.getByReviewId
);

// router.get(
//   "/MultipleReviews",
//   getUser,
//   commentController.getMultipleReviews
// );

router.post(
  "/add",
  getUser,
  userMatches,
  commentController.postNewComment
);

router.put(
  "/edit",
  getUser,
  userMatches,
  commentController.updateComment
);

router.delete(
  "/delete",
  getUser,
  userMatches,
  commentController.deleteComment
);

module.exports = router;
