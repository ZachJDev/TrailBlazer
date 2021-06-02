const {Op} = require('sequelize');
const {DataTypes} = require('sequelize');
const {trailCols, miscCols, parkCols} = require('../configs/ColumnNameConfig')
const {TRAIL_ID, DESCRIPTION, NAME, LENGTH} = trailCols

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const Trail = sequelize.define('trail', {
        [TRAIL_ID]: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        [NAME]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [DESCRIPTION]: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        [parkCols.PARK_ID]: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        [LENGTH]: {
            // I'm going to need to double check MySQL floats, but I think this will be sufficient.
            // I'm also thinking of just storing everything as miles, and then converting in the app at some point.
            type: DataTypes.FLOAT(10, 2),
        },
        [miscCols.PIC_URL]: {
            type: DataTypes.STRING,
        },
    });

    Trail.search = async (searchQuery) => {
        const {trailUserPairs, park } = Trail.associations
        console.log(Trail.associations)
        const trails = await Trail.findAll({
            where: { name: { [Op.like]: `%${searchQuery}%` } },
            include: [park, {association: trailUserPairs, attributes: ['userId'], include: [trailUserPairs.target.associations.trailRating]}],
        })
        return trails
    }
    return Trail;
};