const {DataTypes} = require('sequelize')
const User = require('./Users')
const Trail = require('./Trails')

module.exports = (sequelize, Sequelize) => {
    const TrailRating = sequelize.define("trailRating", {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        trailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Trail,
                key: 'trailId'
            }
        },
        startRating: {
            type: DataTypes.INTEGER(1)
        },
        petFriendly : {
            type: DataTypes.BOOLEAN,
        },
        parking: {
            type: DataTypes.ENUM('On Trailhead', 'Close', 'Far', 'No Marked Parking')
        },
        wheelchairAcc: {
            type: DataTypes.BOOLEAN
        },
        difficulty: {
            type: DataTypes.ENUM('Easy', 'Medium', 'Difficult', 'Strenuous')
        },
        goodForGroups: {
            type: DataTypes.BOOLEAN
        }


    }, )
    return TrailRating
}