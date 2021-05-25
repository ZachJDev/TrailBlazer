const {NotFoundError} = require('../classes/Errors');
const {DataTypes} = require('sequelize');

const {parkCols, miscCols} = require('../configs/ColumnNameConfig');
const {PARK_ID, DESCRIPTION, ADDRESS, NAME, ZIP_CODE, CITY, LOCATION, STATE} = parkCols;

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const Park = sequelize.define(
        'park',
        {
            [PARK_ID]: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            [NAME]: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'stateUnique',
            },
            [ADDRESS]: {
                type: DataTypes.STRING,
            },
            [ZIP_CODE]: {
                type: DataTypes.STRING(5),
            },
            [CITY]: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            [STATE]: {
                type: DataTypes.STRING(2),
                allowNull: false,
                unique: 'stateUnique',
            },
            [DESCRIPTION]: {
                type: DataTypes.TEXT('long'),
            },
            [LOCATION]: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            [miscCols.PIC_URL]: {
                type: DataTypes.STRING,
            },
        },
        {
            uniqueKeys: {
                stateUnique: {
                    fields: [STATE, NAME],
                },
            },
        },
    );
    Park.getById = async (parkId) => {
        const foundPark = await Park.findByPk(parkId, {include: [Park.associations.trails]});
        console.log(foundPark)
        if(!foundPark) throw new NotFoundError('Cannot find Park with that ID')
        return foundPark.dataValues
    };

    Park.sync({alter: true});
    return Park;
};