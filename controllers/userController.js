const db = require('../models/index')

exports.getUserInfo =  async (req, res, next) => {
    const results = await db.User.findByPk(req.params.userId, {attributes: {exclude: ['password', 'createdAt']}})
    res.status(200).json({isUser: req.user?.userId === results.userId, ...results.dataValues})
}