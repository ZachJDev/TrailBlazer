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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ReviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    });

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
        for (let term in searchTerms) { // loop over the parsed query string and add terms that actually exist in the Model.
            if (attributes.includes(term)) {
                FinalSearchTerms[term] = searchTerms[term];
            }
        }
        if (Object.keys(FinalSearchTerms) < 1) {
            throw new Error('No Valid Search Terms provided');
        }


        return Review.findAll(
            {
                where: FinalSearchTerms,
                attributes: options.reviewAttributes ||['title', 'text', 'trailId', 'userId', 'updatedAt', 'ReviewId'],
                include:
                    [{association: Review.associations.trail, attributes:  options.trailAttributes ||['trailId', 'name', 'parkId', 'length']},
                        {association: Review.associations.user, attributes:  options.userAttributes ||['username', 'userId']},
        ],
            });
    };
    return Review;
};