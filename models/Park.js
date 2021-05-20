const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const Park = sequelize.define(
        'park',
        {
            parkId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'stateUnique',
            },
            address: {
                type: DataTypes.STRING,
            },
            zipCode: {
                type: DataTypes.STRING(5),
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(2),
                allowNull: false,
                unique: 'stateUnique',
            },
            description: {
                type: DataTypes.TEXT('long'),
            },
            location: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            picUrl: {
                type: DataTypes.STRING,
            },
        },
        {
            uniqueKeys: {
                stateUnique: {
                    fields: ['state', 'name'],
                },
            },
        },
    );
    Park.sync({alter: true});
    return Park;
};