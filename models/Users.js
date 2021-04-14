const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lengthMeasurement: {
            type: DataTypes.ENUM('Miles', 'Kilometers'),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, )

    User.foo =  async () =>  await User.findAll().then(users => {
        return users.length > 0;

    });
    User.foo().then(hasUsers => console.log(hasUsers))
    User.sync({alter: true})
    return User
}