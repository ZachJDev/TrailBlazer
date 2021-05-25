const {getRandomPic} = require('../configs/getRandomConfig');
const getGeocodeAsync = require('../functions/getGeocodeAsync');
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

    Park.afterDestroy(async (park) => {
        const Trail = Park.associations.trails.source
        await Trail.destroy(({where: {[PARK_ID]: park[PARK_ID]}, individualHooks: true}))
    })
    Park.getById = async (parkId) => {
        const foundPark = await Park.findByPk(parkId, {include: [Park.associations.trails]});
        if (!foundPark) throw new NotFoundError('Cannot find Park with that ID');
        return foundPark;
    };

    Park.add = async ({name, address, state, zipCode, city, description}) => {
        const picUrl = await getRandomPic();
        const geoCodeData = await getGeocodeAsync({address: `${address}, ${city} ${state}, ${zipCode}`});
        const locGeo = geoCodeData.results[0].geometry;
        const park = await Park.create({
            [miscCols.PIC_URL]: picUrl,
            [NAME]: name,
            [ADDRESS]: address,
            [STATE]: state,
            [CITY]: city,
            [ZIP_CODE]: zipCode,
            [DESCRIPTION]: description,
            [LOCATION]: {
                type: 'Point',
                coordinates: [locGeo.location.lat, locGeo.location.lng],
            },
        });
        if (!park) throw new Error('Something went Wrong');
        return park;
    };

    Park.destroyPark = async (parkId) => {
        const deleteRes = await Park.destroy({where: {[PARK_ID]: parkId}, individualHooks: true});
        if(deleteRes !== 1) throw new NotFoundError('Cannot find park to Delete')
        return deleteRes;
    }

    Park.sync({alter: true});
    return Park;
};