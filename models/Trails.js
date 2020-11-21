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
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        parkId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        length: {
            // I'm going to need to double check MySQL floats, but I think this will be sufficient.
            type: DataTypes.FLOAT(5, 2)
        }
    }, )
    return Trail
}