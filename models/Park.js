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
        address: {
            type: DataTypes.STRING,
        },
        zipCode: {
            type: DataTypes.STRING(5)
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long')
        },

    })

// Park.update = (id, newValues) => {
//     Park.findOne({where: {parkId: id}})
//         .then(res => {
//             console.log(res);
//         })
// }

    return Park
}