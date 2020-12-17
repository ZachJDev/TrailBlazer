 const { v4: uuidv4 } = require('uuid');

const {DataTypes} = require('sequelize')
const User = require('./Users')
const Trail = require('./Trails')


module.exports = (sequelize, Sequelize) => {
    const TrailRating = sequelize.define("trailRating", {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        trailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        starRating: {
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
    // TrailRating.sync({force: true})
    TrailRating.removeAttribute('id')

    //    for(let i = 0; i < 100; i++) {
    //         TrailRating.create({
    //         trailId: 1, 
    //         userId: uuidv4(),
    //         starRating: (Math.floor((Math.random() * 5) + 1)),
    //         petFriendly: Math.random() > .5,
    //         parking: (['On Trailhead', 'Close', 'Far', 'No Marked Parking'][Math.floor(Math.random() * 4)]),
    //         wheelchairAcc: Math.random() > .5,
    //         difficulty: (['Easy', 'Medium', 'Difficult', 'Strenuous'][Math.floor(Math.random() * 4)]),
    //         goodForGroups: Math.random() > .5,
    //     }).catch(e => {
    //         console.log(e)
    //     })
    //    }
    
    return TrailRating
}