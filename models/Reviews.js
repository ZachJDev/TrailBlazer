const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ReviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }
    }, )
    return Review
}