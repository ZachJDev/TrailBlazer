const db = require("../models/index");

exports.new = (req, res, next) => {
    const {
        newTrailName,
        newTrailDescription,
        newTrailPark,
        newTrailLength,
        lengthUnit
    } = req.body
    db.Trail.findOne({ where: { name: newTrailName, parkId: newTrailPark } })
    .then(trail => {
    if(trail) {
        throw new Error("Trail Already Exists")
    }
    return db.Trail.create({
        name: newTrailName,
        description: newTrailDescription,
        parkId: newTrailPark,
        // This automatically handles converting between miles and Km, and we will only store the length in miles.
        length: Number(lengthUnit === 'm' ? newTrailLength : (newTrailLength / 1.609344))
    })
    .then(createdTrail => {
        res.status(200).json(createdTrail)
    })
    })
    .catch(e => {
        console.log(e);
        res.status(409).json({errorMessage: e.message})
    })
}
exports.getOne = (req, res, next) => {
    
    let trailId = req.params.id
    db.Trail.findOne(({where: {trailId: trailId}, include:[db.Park]}))
    .then((trail) => {
        if(trail) res.status(200).send(trail)
        else res.status(404).send(trail)
    })
}