const db = require("../models/index")

exports.getOne =  (req, res, next) => {
    let parkId = req.params.parkId
    db.Park.findOne({where: {parkId : parkId}})
    .then(park => {
        if(park !== null){
             res.json(park.dataValues)
             console.log('good')
            }
        else{
             res.status(404).send('')
             console.log(`Could not find Park with id ${parkId}`)
            }
    })

}

exports.add = (req, res, next) => {
    // need to get form data here.

}

exports.update = (req, res, next) => {
   // need to get form data here.
}

exports.delete = (req, res, next) => {

}