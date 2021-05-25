const {Sequelize} = require('./sequelizeGeometryHack');
const {dbname, user, pw, host, port} = require('../configs/dbConfig');
const {reviewCols, trailCols, parkCols, userCols, trailUserPairCols} = require('../configs/ColumnNameConfig');

const sequelize = new Sequelize(dbname, user, pw, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./Users')(sequelize, Sequelize);
db.Comment = require('./Comments')(sequelize, Sequelize);
db.Park = require('./Park')(sequelize, Sequelize);
db.Trail = require('./Trails')(sequelize, Sequelize);
db.Review = require('./Reviews')(sequelize, Sequelize);
db.TrailRating = require('./TrailRatings')(sequelize, Sequelize);
db.TrailUserPair = require('./TrailUser')(sequelize, Sequelize);

// A User has Many Comments
db.User.hasMany(db.Comment, {foreignKey: userCols.USER_ID});
db.Comment.belongsTo(db.User, {foreignKey: userCols.USER_ID});

//  A Park has many Trails
db.Park.hasMany(db.Trail, {foreignKey: parkCols.PARK_ID, onDelete: 'CASCADE'});
db.Trail.belongsTo(db.Park, {foreignKey: parkCols.PARK_ID});

// A Review has many Comments
db.Review.hasMany(db.Comment, {foreignKey: reviewCols.REVIEW_ID, onDelete: 'CASCADE'});
db.Comment.belongsTo(db.Review, {foreignKey: reviewCols.REVIEW_ID});

// A User has many TrailUserPairs
db.User.hasMany(db.TrailUserPair, {foreignKey: userCols.USER_ID, onDelete: 'CASCADE'});
db.TrailUserPair.belongsTo(db.User, {foreignKey: userCols.USER_ID});

// A Trail has many TrailUserPairs
db.Trail.hasMany(db.TrailUserPair, {foreignKey: trailCols.TRAIL_ID, onDelete: 'CASCADE'});
db.TrailUserPair.belongsTo(db.Trail, {foreignKey: trailCols.TRAIL_ID});

// A TrailUserPair has one Review
db.TrailUserPair.hasOne(db.Review, {foreignKey: trailUserPairCols.TRAIL_USER_PAIR_ID, onDelete: 'CASCADE'});
db.Review.belongsTo(db.TrailUserPair, {foreignKey: trailUserPairCols.TRAIL_USER_PAIR_ID});

// A TrailUserPair has one TrailRating
db.TrailUserPair.hasOne(db.TrailRating, {foreignKey: trailUserPairCols.TRAIL_USER_PAIR_ID, onDelete: 'CASCADE'});
db.TrailRating.belongsTo(db.TrailUserPair, {foreignKey: trailUserPairCols.TRAIL_USER_PAIR_ID});

// A Review has one TrailRating
db.Review.hasOne(db.TrailRating, {foreignKey: reviewCols.REVIEW_ID, onDelete: 'CASCADE'});
db.TrailRating.belongsTo(db.Review, {foreignKey: reviewCols.REVIEW_ID});

module.exports = db;
