const {DataTypes} = require('sequelize');
const {reviewCols, trailUserPairCols, trailCols, parkCols, userCols} = require('../configs/ColumnNameConfig');
const {TEXT, REVIEW_ID, TITLE} = reviewCols;

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable
    const Review = sequelize.define('review', {
        [TITLE]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [TEXT]: {
            type: DataTypes.TEXT,
        },
        [REVIEW_ID]: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        [trailUserPairCols.TRAIL_USER_PAIR_ID]: {
            type: DataTypes.UUID,
            unique: true,
        },
    });

    Review.findById = async (id) => {
        const associations = Review.associations;
        const trailUserPair = associations.trailUserPair;
        const trail = trailUserPair.target.associations.trail;
        const user = trailUserPair.target.associations.user;
        return await Review.findByPk(id, {include: [{association: trailUserPair, include: [trail, user]}]})
    }

    Review.getByUserId = async (userId) => {
        const TrailUserPair = Review.associations.trailUserPair.target;
        const queryRes = await TrailUserPair.findOne({where: {[userCols.USER_ID]: userId}, include: [Review]})
        return queryRes.review;
    }

    Review.getByTrailId = async (trailId) => {
        const TrailUserPair = Review.associations.trailUserPair.target;
        const queryRes = await TrailUserPair.findOne({where: {[trailCols.TRAIL_ID]: trailId}, include: [Review]})
        return queryRes.review;
    }

    Review.addOrUpdate = async ({trailId, userId, title, text}) => {
        const TrailUserPair = Review.associations.trailUserPair.target;
        const trailPair = await TrailUserPair.findOrCreate({
            where: {[trailCols.TRAIL_ID]: trailId, [userCols.USER_ID]: userId},
            defaults: {trailId, userId},
        });
        const trailUserPairId = trailPair[0].dataValues.trailUserPairId;
        const [{reviewId}] = await Review.upsert({trailUserPairId, title, text});
        return {reviewId};
    };



    //
    // Review.getAttributes = () => {
    //     const attributes = [];
    //     for (let attribute in Review.rawAttributes) {
    //         attributes.push(attribute);
    //     }
    //     return attributes;
    // };

//     Review.search = async (searchTerms, options = {}) => {
//         const FinalSearchTerms = {};
//         for (let term in searchTerms) {
//             // loop over the parsed query string and add terms that actually exist in the Model.
//             if (Review.rawAttributes.includes(term)) {
//                 FinalSearchTerms[term] = searchTerms[term];
//             }
//         }
//         if (Object.keys(FinalSearchTerms) < 1) {
//             throw new Error('No Valid Search Terms provided');
//         }
//

//
//         return await Review.findAll({
//             where: FinalSearchTerms,
//             attributes: options.reviewAttributes || [
//                 [TITLE],
//                 [TEXT],
//                 'updatedAt',
//                 [REVIEW_ID],
//             ],
//             include: [
//                 {
//                     association: trailUserPair,
//                     include: [
//                         {
//                             association: trail,
//                             attributes: [trailCols.NAME, trailCols.TRAIL_ID, trailCols.LENGTH,
//                             ],
//                             include: [{
//                                 association: trail.source.associations.park,
//                                 attributes: [parkCols.PARK_ID, parkCols.NAME],
//                             }],
//                         },
//                         {
//                             association: user,
//                             attributes: options.userAttributes || [userCols.USERNAME, userCols.USER_ID],
//                         },
//                     ],
//                 },
//             ],
//         });
//     };
    return Review;
};