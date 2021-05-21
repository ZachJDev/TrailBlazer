const { DataTypes } = require("sequelize");
const {STAR_RATING, DIFFICULTY, GROUPS, PARKING, PET_FRIENDLY, WHEELCHAIR_ACC} = require('./ColumnNameConfig').TrailRatingCols

module.exports = (sequelize) => {
  // noinspection JSUnresolvedVariable,JSUnresolvedFunction
  const TrailRating = sequelize.define("trailRating", {
    [STAR_RATING]: {
      type: DataTypes.INTEGER(1),
    },
    [PET_FRIENDLY]: {
      type: DataTypes.BOOLEAN,
    },
    [PARKING]: {
      type: DataTypes.ENUM("On Trailhead", "Close", "Far", "No Marked Parking"),
    },
    [WHEELCHAIR_ACC]: {
      type: DataTypes.BOOLEAN,
    },
    [DIFFICULTY]: {
      type: DataTypes.ENUM("Easy", "Medium", "Difficult", "Strenuous"),
    },
    [GROUPS]: {
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
