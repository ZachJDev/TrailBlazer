const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable
    const Review = sequelize.define('review', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
        },
        reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        trailUserPairId: {
            type: DataTypes.UUID,
            unique: true
        }
    });

    Review.addOrUpdate = async ({trailId, userId, title, text}) => {
        const TrailUserPair = Review.associations.trailUserPair.target;
        const trailPair = await TrailUserPair.findOrCreate({
            where: {trailId, userId},
            defaults: {trailId, userId},
        });
        const trailUserPairId = trailPair[0].dataValues.trailUserPairId;
        const [{reviewId}] = await Review.upsert({trailUserPairId, title, text});
        console.log(reviewId)
        return {reviewId};
    };

    Review.getAttributes = () => {
        const attributes = [];
        for (let attribute in Review.rawAttributes) {
            attributes.push(attribute);
        }
        return attributes;
    };

    Review.search = (searchTerms, options = {}) => {
        const attributes = Review.getAttributes();
        const FinalSearchTerms = {};
        for (let term in searchTerms) {
            // loop over the parsed query string and add terms that actually exist in the Model.
            if (attributes.includes(term)) {
                FinalSearchTerms[term] = searchTerms[term];
            }
        }
        if (Object.keys(FinalSearchTerms) < 1) {
            throw new Error('No Valid Search Terms provided');
        }

        const associations = Review.associations;
        const trail = associations.trail;
        const user = associations.user;

        return Review.findAll({
            where: FinalSearchTerms,
            attributes: options.reviewAttributes || [
                'title',
                'text',
                'trailId',
                'userId',
                'updatedAt',
                'reviewId',
            ],
            include: [
                {
                    association: trail,
                    include: [
                        {
                            association: trail.target.associations.park,
                            attributes: ['name', 'parkId'],
                        },
                    ],
                    attributes: options.trailAttributes || [
                        'trailId',
                        'name',
                        'parkId',
                        'length',
                    ],
                },
                {
                    association: user,
                    attributes: options.userAttributes || ['username', 'userId'],
                },
            ],
        });
    };
    return Review;
};