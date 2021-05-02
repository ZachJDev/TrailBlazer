// noinspection JSUnresolvedVariable

const db = require("../models/index");
const {
  EntryExistsError,
  QueryError,
  NotFoundError,
} = require("../classes/Errors");

const queryString = require('query-string')


exports.getTrailReviews = (req, res) => {
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
            console.log(rev)
          return {
              reviewId: rev.ReviewId,
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

exports.getSingleReview = (req, res, next) => {
  console.log(
    "getting review for",
    req.params.userId,
    "And",
    req.query.trailId
  );
  let foundReview, foundRatings;
  try {
    if (!req.query.trailId) throw new QueryError("no Trail specified in query");
    db.Review.findOne({
      where: { userId: req.params.userId, trailId: req.query.trailId },
    })
      .then((review) => {
        if (review) {
          foundReview = review.dataValues;
          return db.TrailRating.findOne({
            where: { userId: req.params.userId, trailId: req.query.trailId },
          });
        } else throw new NotFoundError("No review for that user and trail");
      })
      .then((ratings) => {
        // Not a HUGE problem if ratings aren't found (though as it stands right now, not exactly possible to
        // post a review without them) Not going to throw an error here.
        foundRatings = ratings || {};
        res
          .status(200)
          .json({ status: 200, ...foundReview, ...foundRatings.dataValues });
      })
      .catch((e) => {
        if (e instanceof NotFoundError)
          res.status(404).json({ errorMessage: e.message });
        res.status(400).json({ errorMessage: e.message });
      });
  } catch (e) {
    if (e instanceof QueryError)
      res.status(400).json({ errorMessage: e.message });
    res.status(400).json({ errorMessage: e.message });
  }
};

exports.postNewTrailReview = (req, res, next) => {
  // with the addition of the userMatches middleware, no longer need to ensure they are logged in here.
  const { reviewTitle, reviewText, parking, difficulty } = req.body;
  const { trailId } = req.query;
  console.log("Posting New Review...");
  const petFriendly = req.body.petFriendly === "Yes";
  const goodForGroups = req.body.goodForGroups === "Yes";
  const wheelchairAcc = req.body.wheelchairAcc === "Yes";

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

exports.updateReview = (req, res) => {
  const { reviewTitle, reviewText, parking, difficulty } = req.body;
  const { trailId } = req.query;
  console.log("Posting Edited Review...");
  const petFriendly = req.body.petFriendly === "Yes";
  const goodForGroups = req.body.goodForGroups === "Yes";
  const wheelchairAcc = req.body.wheelchairAcc === "Yes";

 return db.Review.update(
    { text: reviewText, title: reviewTitle },
    { where: { userId: req.user.userId, trailId } }
  ).then((review) => {
   return db.TrailRating.update(
      { petFriendly, goodForGroups, wheelchairAcc, parking, difficulty },
      { where: { userId: req.user.userId, trailId } }
    );
  })
  .then(rating => {
    res.status(200).json({success: true})
  })
.catch(e => {
    console.log(e.message);
    res.status(400).json({errorMessage: e.message})
  })
};

exports.getById = (req, res) => {
    db.Review.findOne({where: {reviewId: req.params.id}, include: [db.Trail, db.User]}).then(review => {
        if(review === null) {
            throw new Error("cannot find review")
        }
        const isEditable = req.user && req.user.userId === review.user.userId
        const reply = {
            text: review.text,
            title: review.title,
            trail: review.trail,
            trailId: review.trailId,
            username: review.user.username,
            isEditable
        }
        res.status(200).json({success: true, review: reply });
    })
        .catch(e => {
            res.status(404).json({success: false, error: e.message})
        })
}

exports.getReviews = async (req, res, next) => {
    const searchTerms = queryString.parse(req.params.term)
    try {
        const results = await db.Review.search(searchTerms)
        res.json(results)
    }catch (e) {
        console.log(e.message);
    }


}