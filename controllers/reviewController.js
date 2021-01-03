const db = require("../models/index");
const { EntryExistsError } = require("../classes/Errors");

exports.getTrailReviews = (req, res, next) => {
  const trailId = req.params.id;
  let fetchedReviews;
  let fetchedRatings = {};

  db.Review.findAll({ where: { trailId }, include: [db.User] })
    .then((reviews) => {
      let promises = [];
      fetchedReviews = reviews;
      reviews.forEach((review) => {
        promises.push(
          db.TrailRating.findOne({ where: { userId: review.userId, trailId } })
        );
      });
      return Promise.all(promises);
    })
    .then((ratings) => {
      ratings.forEach((rating) => {
        try {
          // I want to find a cleaner way of grabbing only some of the ratings...
          const {
            difficulty,
            goodForGroups,
            parking,
            petFriendly,
            wheelchairAcc,
          } = rating;
          
          fetchedRatings[rating.userId] = {
            difficulty,
            goodForGroups,
            parking,
            petFriendly,
            wheelchairAcc,
          };
        } catch (e) {
          console.log("ratings not found");
        }
      });
      res.json({
        reviews: fetchedReviews.map((rev) => {
          return {
            title: rev.title,
            username: rev.user.username,
            text: rev.text,
            isEditable: rev.userId === req.session.userId,
            ratings: fetchedRatings[rev.userId],
          };
        }),
        userHasReviewed: req.userHasReviewed,
      });
    });
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
  const { reviewTitle, reviewText, parking, difficulty } = req.body;
  const { trailId } = req.query;
  console.log("Posting New Review...");
  const petFriendly = req.query.petFriendly === "Yes";
  const goodForGroups = req.query.goodForGroups === "Yes";
  const wheelchairAcc = req.query.wheelchairAcc === "Yes";

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
      return db.TrailRating.findUpdateCreate(
        { userId: req.session.userId, trailId },
        {
          parking,
          petFriendly,
          goodForGroups,
          difficulty,
          wheelchairAcc,
        }
      );
    })
    .then((rating) => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      if (e instanceof EntryExistsError) {
        res.status(409).json({
          errorMessage: `review already exists for user '${req.user.username}'`,
        });
      }
    });
};
