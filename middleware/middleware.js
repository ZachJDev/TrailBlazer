const db = require('../models/index');

module.exports.getUser = (req, res, next) => {
    console.log('searching for user');
    console.log(req.session.userId)
    db.User.findOne({where: {userId: req.session.userId}})
        .then(user => {
            req.user = user;
            next();
        })
        .catch(e => {
            console.log("user Not Found")
            next();
        });
};

module.exports.userMatches = (req, res, next) => {
    try {
        req.user.matchesRequest = req.user.userId === req.body.userId;
        // req.body.userID should always be that of the user who created the resource.
        //  Which should hopefully match the user who is logged in.
        console.log('user Matches: ', req.user.matchesRequest);
        next();
    } catch (e) {
        /* Catching non-authenticated users here (instead of in the getUser middleware) because
        I can imagine some scenarios where I may want (but not require) a user,
        but never a scenario when I want to make sure a user is who they say they are, but not need
        to grab the user first.
        */
        res.status(401).json({errors: ['User Not Authenticated on Server']});
    }
};

module.exports.userIsAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(401).json({success: false, error: "You are not authorized to perform that action."});
    } else {
        next();
    }
};