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

    TrailUserPair.getReviewsBase = async (trailOrUser, id) => {
        const Reviews = TrailUserPair.associations.review;
        const pairs = await TrailUserPair.findAll({
            where: {[trailOrUser]: id},
            attributes: [],
            include: [{association: Reviews, attributes: ['title', 'text', 'reviewId', 'updatedAt']}],
        });
        return pairs.map(stuff => stuff.review);
    };

    TrailUserPair.getReviewsByTrail = async (trailId) => {
        return await TrailUserPair.getReviewsBase('trailId', trailId);
    };
    TrailUserPair.getReviewsByUserId = async (userId) => {
        return await TrailUserPair.getReviewsBase('userId', userId);
    }
    TrailUserPair.sync();
    return TrailUserPair;
};