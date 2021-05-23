const {Op} = require('sequelize');
const {DataTypes} = require('sequelize');
const {trailCols, trailUserPairCols, userCols, reviewCols} = require('./ColumnNameConfig')
const {TRAIL_USER_PAIR_ID} = trailUserPairCols
const {TEXT,TITLE, REVIEW_ID} = reviewCols


module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const TrailUserPair = sequelize.define('trailUserPair', {
            [TRAIL_USER_PAIR_ID]: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            [userCols.USER_ID]: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'trailUserPair',
            },
            [trailCols.TRAIL_ID]: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: 'trailUserPair',
            },
        },
        {
            uniqueKeys: {
                trailUserPair: {
                    fields: [trailCols.TRAIL_ID, userCols.USER_ID],
                },
            },
        },
    );

    TrailUserPair.getReviewsBase = async (trailOrUser, id) => {
        const Reviews = TrailUserPair.associations.review;
        const pairs = await TrailUserPair.findAll({
            where: {[trailOrUser]: id},
            attributes: [],
            include: [{association: Reviews, attributes: [TEXT, TITLE, REVIEW_ID, 'updatedAt']}],
        });
        return pairs.map(pair => pair.review);
    };

    TrailUserPair.getReviewsByTrail = async (trailId) => {
        return await TrailUserPair.getReviewsBase(trailCols.TRAIL_ID, trailId);
    };
    TrailUserPair.getReviewsByUserId = async (userId) => {
        return await TrailUserPair.getReviewsBase(userCols.USER_ID, userId);
    }
    TrailUserPair.sync();
    return TrailUserPair;
};