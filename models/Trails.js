const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Trail = sequelize.define("trail", {
        trailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parkId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, )
    return Trail
}