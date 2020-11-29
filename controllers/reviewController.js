const db = require("../models/index");

exports.getTrailReviews = (req, res, next) => {
    const trailId = req.params.id
    console.log(trailId)

    db.Review.findAll({where: {trailId}, include: [db.User]})
    .then(reviews => {
        res.json({reviews})
    })
}