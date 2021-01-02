const db = require("../models/index");
const { EntryExistsError } = require("../classes/Errors");

exports.getTrailReviews = (req, res, next) => {
  const trailId = req.params.id;
  console.log(trailId);

  db.Review.findAll({ where: { trailId }, include: [db.User] }).then(
    (reviews) => {
      res.json({
        reviews: reviews.map((rev) => {
          return {
            title: rev.title,
            username: rev.user.username,
            text: rev.text,
            isEditable: rev.userId === req.session.userId,
          };
        }),
        userHasReviewed: req.userHasReviewed,
      });
    }
  );
};
exports.checkUserForReview = (req, res, next) => {
  db.Review.count({
    where: { userId: req.session.userId || "", trailId: req.params.id }, // empty string if user is not authenticated
  }).then((count) => {
    req.userHasReviewed = count > 0;
    next();
  });
};

exports.postNewTrailReview = (req, res, next) => {
  // with the addition of the userMatches middleware, no longer need to ensure they are logged in here.
  const {
    reviewTitle,
    reviewText,
    parking,
    difficulty,
  } = req.body;
  const { trailId } = req.query;
  console.log("Posting New Reivew...");
  const petFriendly = req.query.petFriendly === 'Yes'
  const goodForGroups = req.query.goodForGroups === 'Yes'
  const wheelchairAcc = req.query.wheelchairAcc === 'Yes'
  
  db.Review.count({ where: { userId: req.session.userId, trailId } })
    .then((count) => {
      if (count > 0) {
        throw new EntryExistsError("Review already exists with that username");
      }
    })
    .then(() => {
      db.Review.create({
        title: reviewTitle,
        text: reviewText,
        userId: req.session.userId,
        trailId,
      });
    })
    .then((review) => {
      return db.TrailRating.upsert({
        userId: req.session.userId,
        trailId,
        parking,
        petFriendly,
        goodForGroups,
        difficulty,
        wheelchairAcc,
      });
    })
    .then((rating) => {
      console.log(rating);
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log(e)
      if (e instanceof EntryExistsError) {
        res
          .status(409)
          .json({
            errorMessage: `review already exists for user '${req.user.username}'`,
          });
      }
    });
};
