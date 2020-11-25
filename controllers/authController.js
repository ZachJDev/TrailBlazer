const db = require("../models/index");
const {uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  console.log("Here");
  res.json({
    login: true,
  });
};

exports.signUp = (req, res, next) => {
    console.log(req.body)
}
