const db = require("../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const {
  AuthenticationError,
  InputError,
  NotFoundError,
  ConflictError
} = require("../classes/Errors");

// This stackExchange question: https://security.stackexchange.com/questions/17207/recommended-of-rounds-for-bcrypt
// has an interesting idea about benchmarking the system to determine the # of salt rounds based on the amount of time it takes.
// Actual implementation of that is not something I'm concerned with, however, at this point.

const SALT_ROUNDS = 12;

// The error handling in the postLogin is a bit different than what I did with my new Park controller:
// That would set the status and body where the error was thrown, then only have one res statement.
// That does seem like it would be a bit cleaner, but I like the readability of the below more.

exports.postLogin = (req, res, next) => {
    let user;
  const { username, password } = req.body;
  db.User.findOne({ where: { username } })
    .then((foundUser) => {
      if (!foundUser) throw new NotFoundError("No user with that username found");
      user = foundUser
      const hashedPassword = user.password;
      return bcrypt.compare(password, hashedPassword);
    })
    .then((isSame) => {
      if (!isSame) throw new InputError("Password Incorrect");
      req.session.isLoggedIn = true;
      // My plan right now is to store only the userId on the cookie
      // and pull from the db whenever I need info (probably with middleware).
      // My other idea would be to store essential info directly on the session cookie
      // (like pref. units and username), but that may be 1. less efficient, space-wise, and not secure.
      req.session.userId = user.userId;
      return req.session.save();
    })
    .then(() => {
        console.log("logged in:", user.username)
        console.log('isAdmin?', user.isAdmin)
        res.status(200).json({username: user.username, userId: user.userId, lengthMeasurement: user.lengthMeasurement, isLoggedIn: true,  isAdmin: user.isAdmin})
    })
    .catch((e) => {
        console.log("LOGIN FAILED")
      if (e instanceof NotFoundError)
        res.status(404).json({ errorMessage: e.message });
      else if (e instanceof InputError) // Poor error handling here from a security experience perspective -- probably shouldn't
      // Tell exactly what's the problem.
        res.status(400).json({ errorMessage: e.message, errors: ['password'] });
    });
};

exports.signUp = (req, res, next) => {
  const { username, password, confirmPassword, emailAddress, measure, isAdmin } = req.body;
  db.User.findOne({
    where: { [Op.or]: [{ email: emailAddress }, { username }] },
  })
    .then((user) => {
      if (!user) {
        // keep up signing up
        if(password !== confirmPassword) throw new InputError("Confirm Password field must match Password field.")
        return bcrypt.hash(password, SALT_ROUNDS);
      } else
        throw new ConflictError(
          "An Account exists with that email address or username"
        );
    })
    .then((hash, e) => {
      console.log("password Hashed");
      return db.User.create({
        username,
        password: hash,
        email: emailAddress,
        lengthMeasurement: measure,
        isAdmin
      });
    })
    .then((user) => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      console.log("Error on Signup: ", e.message, typeof e);
      if(e instanceof InputError) res.status(400).json({ errorMessage: e.message });
      if(e instanceof ConflictError) res.status(409).json({ errorMessage: e.message});
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err, ses) => {
    console.log(err)
    res.status(200).json({success: true})
  });
}

exports.getUserData =  (req, res, next) => {
  console.log("user session:",req.session)
  if(req.session.isLoggedIn) {
      console.log( 'looking for: ', req.session.userId)
      db.User.findOne({where: {userId: req.session.userId}})
      .then(user => {
        res.status(200).json({username: user.username, userId: user.userId, lengthMeasurement: user.lengthMeasurement, isLoggedIn: true, isAdmin: user.isAdmin})
      })
      .catch(e => {
        console.log("USER NOT FOUND")
        res.status(404).json({})
      })

  }
}
