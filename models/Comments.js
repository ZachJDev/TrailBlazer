const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    },  )
    return Comment
}