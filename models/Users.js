const {DataTypes} = require('sequelize');
const {userCols} = require('./ColumnNameConfig');
const {USER_ID, BIO, EMAIL, IS_ADMIN, LENGTH_MEASURE, PASSWORD, USERNAME} = userCols;

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const User = sequelize.define('user', {
        [USERNAME]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [USER_ID]: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        [PASSWORD]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [IS_ADMIN]: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        [LENGTH_MEASURE]: {
            type: DataTypes.ENUM('Miles', 'Kilometers'),
            allowNull: false,
        },
        [EMAIL]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [BIO]: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    User.sync({alter: true});
    return User;
};