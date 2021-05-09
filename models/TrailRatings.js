const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // noinspection JSUnresolvedVariable,JSUnresolvedFunction
  const TrailRating = sequelize.define("trailRating", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    trailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    starRating: {
      type: DataTypes.INTEGER(1),
    },
    petFriendly: {
      type: DataTypes.BOOLEAN,
    },
    parking: {
      type: DataTypes.ENUM("On Trailhead", "Close", "Far", "No Marked Parking"),
    },
    wheelchairAcc: {
      type: DataTypes.BOOLEAN,
    },
    difficulty: {
      type: DataTypes.ENUM("Easy", "Medium", "Difficult", "Strenuous"),
    },
    goodForGroups: {
      type: DataTypes.BOOLEAN,
    },
  });

  TrailRating.findUpdateCreate = ({ trailId, userId }, ratings) => {
    TrailRating.findOne({ where: { trailId, userId } }).then((rating) => {
      if (!rating) {
        return TrailRating.create({ trailId, userId, ...ratings });
      } else {
        return TrailRating.update(ratings, {
          where: {
            userId,
            trailId,
          },
        });
      }
    });
  };
  TrailRating.removeAttribute("id");

  return TrailRating;
};
