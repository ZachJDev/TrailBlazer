const db = require("../models/index");

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  console.log("Here");
  res.json({
    login: true,
  });
};
