const {Op} = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const TrailUserPair = sequelize.define('trailUserPair', {
            trailUserPairId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'trailUserPair',
            },
            trailId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: 'trailUserPair',
            },
        },
        {
            uniqueKeys: {
                trailUserPair: {
                    fields: ['trailId', 'userId'],
                },
            },
        },
    );

    TrailUserPair.getReviewsByTrail = async (trailId, userId = null) => {
        const Reviews = TrailUserPair.associations.review
        return await TrailUserPair.findAll({where: {[Op.or]: [{trailId}, {userId}]}, include: [Reviews]})
    }
    TrailUserPair.sync();
    return TrailUserPair;
};