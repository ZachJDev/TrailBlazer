const db = require("../models/index");

exports.new = (req, res, next) => {
    const {
        newTrailName,
        newTrailDescription,
        newTrailPark
    } = req.body
    console.log(req.body)
    db.Trail.findOne({ where: { name: newTrailName, parkId: newTrailPark } })
    .then(trail => {
    if(trail) {
        throw new Error("Trail Already Exists")
    }
    return db.Trail.create({
        name: newTrailName,
        description: newTrailDescription,
        parkId: newTrailPark
    })
    .then(createdTrail => {
        console.log(createdTrail)
        res.status(200).json(createdTrail)
    })
    })
    .catch(e => {
        console.log(e);
        res.status(409).json({errorMessage: e.message})
    })
}