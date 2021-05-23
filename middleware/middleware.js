const db = require('../models/index');
const {InputError} = require('../classes/Errors');

module.exports.getUser = (req, res, next) => {
    console.log('searching for user');
    console.log(req.session.userId);
    db.User.findOne({where: {userId: req.session.userId}})
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((e) => {
            console.log(e)
            console.log('user Not Found');
            next();
        });
};

module.exports.userMatches = (req, res, next) => {
    try {
        // console.log(req.user.userId, req.body.userId);
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
    if (!req.user?.isAdmin) {
        res.status(401).json({
            success: false,
            error: 'You are not authorized to perform that action.',
        });
    } else {
        next();
    }
};

module.exports.authDelete = (req, res, next) => {
    if (req.user.isAdmin || req.user.userId === req.body.userId) {
        next();
    } else {
        res.status(401).json({
            success: false,
            errors: ['User is not authorized to make that request.'],
        });
    }
};

// This middleware can be used to ensure necessary arguments were passed to the request body, URL query, and URL params.
module.exports.validateReq = ({body, query, params}) => (req, res, next) => {
    // iterate over args and check if all are present in some reqObj. return false if not.
    const validateReqObj = (reqObj) => (args = []) =>
        args.reduce((acc, arg) => acc && arg in reqObj, true);
    // create functions for each of the three places I'll be checking.
    const validateBody = validateReqObj(req.body);
    const validateQuery = validateReqObj(req.query);
    const validateParams = validateReqObj(req.params);

    try {
        if (!validateBody(body)) {
            throw new InputError('Missing Required Body Arguments');
        }
        if (!validateParams(params)) {
            throw new InputError('Missing Required URL Param Arguments');
        }
        if (!validateQuery(query)) {
            throw new InputError('Missing Required URL Query Arguments');
        }
        next();
    } catch (e) {
        console.log(e)
        res.status(400).json({success: false, errors: ['missing required information']});
    }
};
