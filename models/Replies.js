const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // noinspection JSUnresolvedVariable
  const Reply = sequelize.define("reply", {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Reply;
};