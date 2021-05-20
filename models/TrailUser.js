const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const TrailUserPair = sequelize.define('TrailUserPair', {
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
        )
    ;
    TrailUserPair.sync();
    return TrailUserPair;
};