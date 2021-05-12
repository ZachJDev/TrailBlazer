const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/park", require("./parkRoutes"));
router.use("/search", require("./searchRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/trail", require("./trailRoutes"));
router.use("/reviews", require("./reviewRoutes"));
router.use("/ratings", require("./ratingRoutes"));
router.use("/comments", require("./commentRoutes"));
router.use("/user", require("./userRoutes"));

module.exports = router;
