const {DataTypes} = require('sequelize');

const {parkCols, miscCols} = require('./ColumnNameConfig')
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
    Park.sync({alter: true});
    return Park;
};