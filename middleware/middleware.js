const db = require('../models/index')

module.exports.getUser = (req, res, next) => {
    console.log('searching for user')
    db.User.findOne({where: {userId: req.session.userId}})
    .then(user => {
        req.user = user
        next();
    })
    .catch(e => {
        next();
    })

}