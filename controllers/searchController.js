const db = require("../models/index");
const Op = require("sequelize").Op;

exports.search = (req, res) => {
  const query = req.query.q;
  let type = req.params.type;

  if (type === "Park") {
    db.Park.findAll({ where: { name: { [Op.like]: `%${query}%` } } }).then(
      (results) => {
        res.json({ results, type: "park" });
      }
    );
  }
  // I imagine there's a better way of doing this...
  // As stated elsewhere, my current pattern of sending all the rating data
  // to the client and handling the averaging there NEEDS to STOP.
  else if (type === "Trail") {
    let trails = {};
    db.Trail.findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      include: [db.Park],
    })
      .then((results) => {
        results.forEach((trail) => {
          // noinspection JSUnresolvedVariable
          trails[trail.dataValues.trailId] = {
            ...trail.dataValues,
            ratings: [],
          };
        });
        const promises = results.map((res) => {
          // noinspection JSUnresolvedVariable
          return db.TrailRating.findAll({
            where: { trailId: res.dataValues.trailId },
          });
        });
        return Promise.all(promises);
      })
      .then((info) => {
        // This just pushes each rating into the array.
        info[0].forEach((trailRating) => {
          // noinspection JSUnresolvedVariable
          trails[trailRating.dataValues.trailId].ratings.push(
            trailRating.dataValues
          );
        });
        res.json({
          type: "trail",
          results: Object.keys(trails).map((tr) => trails[tr]),
        }); // The Search component only works with arrays
      });
  }
};
