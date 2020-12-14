const db = require("../models/index");

exports.getTrailReviews = (req, res, next) => {
    const trailId = req.params.id
    console.log(trailId)

    db.Review.findAll({where: {trailId}, include: [db.User]})
    .then(reviews => {
        res.json({reviews})
    })
}
exports.postNewTrailReview = (req, res, next) => {
    // check that the user is logged in
    if(!req.session.isLoggedIn) {
        console.log('you\'re not logged in')
    } else {
        const { reviewTitle, reviewText, parking} = req.body
        console.log(parking)
        const {trailId} = req.query
        db.Review.create({title: reviewTitle, text: reviewText, userId:req.session.userId, trailId })
        .then(review => {
            return db.TrailRating.upsert({userId: req.session.userId, trailId, parking: parking})
        })
        .then(rating => {
            console.log(rating);
            res.status(200).json({success: true})
        })
    }
    // Make sure 
}