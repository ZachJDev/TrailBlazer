db = require('../models/index');
const {NoContentError} = require('../classes/Errors')

exports.getTrailRatings = (req, res, next) => {
    let trailId = req.params.id;
    db.TrailRating.findAll({where: {trailId: trailId}})
    .then(trailRatings => {
        if(trailRatings.length < 1) throw new NoContentError('No Trail Ratings Found')
        const ratings = splitRatings(trailRatings)
        res.status(200).json({...ratings, success: true})
        // const starRating = ratings.map(rate)
    })
    .catch(e => {
        console.log(e.message, `for trail: ${trailId}`)
        if(e instanceof NoContentError) {
            
            res.status(204).json({success: false})
        } else {
            res.status(500).json({success:false})

        }
    })
}

const splitRatings = (ratings) => {
    const splitRatings ={
        starRating:[],
    petFriendly: [],
    parking: [],
    wheelchairAcc: [],
    difficulty: [],
    goodForGroups: [],}
    ratings.forEach(element => {
        for(let key in element.dataValues) {
            try{
                splitRatings[key].push(element.dataValues[key])
            } catch (e) {
                // added to ignore unwanted elements, e.g. createdAt
            }
        }
    });
    return splitRatings
}