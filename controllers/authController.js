const db = require("../models/index");
const { uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const SALT_ROUNDS = 10;

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  console.log("Here");
  res.json({
    login: true,
  });
};

exports.signUp = (req, res, next) => {
  const { username, password, emailAddress } = req.body;

  db.User.findOne({
    where: { [Op.or]: [{ email: emailAddress }, { name: username }] },
  })
    .then((user) => {
      if (!user) {
        // keep up signing up
        return bcrypt.hash(password, SALT_ROUNDS);
      } else throw new Error("An Account exists with that email address or username");
    })
    .then((hash, e) => {
      return db.User.create({
        name: username,
        password: hash,
        email: emailAddress,
      });
    })
    .then((user) => {
      res.status(200).json({operation: 'success'})
    })
    .catch((e) => {
      console.log("error when registering user.");
      res.status(409).json({ errorMessage: e.message });
    });
};
