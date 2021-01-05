db = require("../models/index");
const { NoContentError } = require("../classes/Errors");
exports.getTrailRatings = (req, res, next) => {
  let trailId = req.params.id;
  let ratingModes = {};
  db.TrailRating.findAll({ where: { trailId: trailId } })
    .then((trailRatings) => {
      if (trailRatings.length < 1)
        throw new NoContentError("No Trail Ratings Found");
      const ratings = splitRatings(trailRatings);
      for (let rating in ratings) {
        try {
          const freqChart = {};
          ratings[rating].forEach((r) => {
            // 'r' for 'rating'
            if (r !== null) freqChart[r] = freqChart[r] ? ++freqChart[r] : 1;
          });

          ratingModes[rating] = getMaxFrequency(freqChart);
        } catch (e) {
          console.log(e);
          continue
        }
      }
      res.status(200).json({ ...ratingModes, success: true });
      // const starRating = ratings.map(rate)
    })
    .catch((e) => {
      console.log(e.message, `for trail: ${trailId}`);
      if (e instanceof NoContentError) {
        res.status(204).json({ success: false });
      } else {
        res.status(500).json({ success: false });
      }
    });
};

const splitRatings = (ratings) => {
  const splitRatings = {
    starRating: [],
    petFriendly: [],
    parking: [],
    wheelchairAcc: [],
    difficulty: [],
    goodForGroups: [],
  };
  ratings.forEach((element) => {
    for (let key in element.dataValues) {
      try {
        splitRatings[key].push(element.dataValues[key]);
      } catch (e) {
        // added to ignore unwanted elements, e.g. createdAt
      }
    }
  });
  return splitRatings;
};

const getMaxFrequency = (obj) => {
    let max = -Infinity
  let maxName = "foo";
  let numRatings = 0;
  for (let x in obj) {
      numRatings +=obj[x]
    if (obj[x] > max) {
      maxName = x;
      max = obj[x];
    }
}
  return {name: maxName, freq: max, numRatings };
};
