const db = require("../models/index");

exports.search = (req, res, next) => {
    let type = req.params.type
    db[type].findAll()
    .then(results => {
       res.json(results)
    })
}