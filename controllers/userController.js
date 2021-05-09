const db = require("../models/index");

exports.getUserInfo = async (req, res, next) => {
  const results = await db.User.findByPk(req.params.userId, {
    attributes: { exclude: ["password", "createdAt"] },
  });
  res.status(200).json({
    isUser: req.user?.userId === results.userId,
    ...results.dataValues,
  });
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("Deleting User...");
  try {
    const deleteRes = await db.User.destroy({ where: { userId } });
    if (deleteRes === 0) {
      res.status(400).send({ success: false, errors: ["user does not exist"] });
    } else {
      await db.Review.destroy({ where: { userId } });
      await db.TrailRating.destroy({ where: { userId } });
      await db.Comment.destroy({ where: { userId } });
      res.status(200).send({ success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(200).send({ success: true });
  }
};
