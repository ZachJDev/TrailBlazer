const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Park = sequelize.define("park", {
        parkId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipCode: {
            type: DataTypes.INTEGER
        }

    }, )
    return Park
}