const { Sequelize } = require("./sequelizeGeometryHack");
const { dbname, user, pw, host, port } = require("../configs/dbConfig");

const sequelize = new Sequelize(dbname, user, pw, {
  host,
  port,
  dialect: "mysql",
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./Users")(sequelize, Sequelize);
db.Comment = require("./Comments")(sequelize, Sequelize);
db.Park = require("./Park")(sequelize, Sequelize);
db.Trail = require("./Trails")(sequelize, Sequelize);
db.Review = require("./Reviews")(sequelize, Sequelize);
db.TrailRating = require("./TrailRatings")(sequelize, Sequelize);
db.TrailUserPair = require("./TrailUser")(sequelize, Sequelize)

// A User has Many Comments
db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId" });

//  A Park has many Trails
db.Park.hasMany(db.Trail, { foreignKey: "parkId" });
db.Trail.belongsTo(db.Park, { foreignKey: "parkId" });

// A Review has many Comments
db.Review.hasMany(db.Comment, { foreignKey: "reviewId" });
db.Comment.belongsTo(db.Review, { foreignKey: "reviewId" });

// A User has many TrailUserPairs
db.User.hasMany(db.TrailUserPair, { foreignKey: "userId" });
db.TrailUserPair.belongsTo(db.User, { foreignKey: "userId" });

// A Trail has many TrailUserPairs
db.Trail.hasMany(db.TrailUserPair, { foreignKey: "trailId" });
db.TrailUserPair.belongsTo(db.Trail, { foreignKey: "trailId" });

// A TrailUserPair has one Review
db.TrailUserPair.hasOne(db.Review , { foreignKey: "trailUserPairId" });
db.Review.belongsTo(db.TrailUserPair, { foreignKey: "trailUserPairId" });

// A TrailUserPair has one TrailRating
db.TrailUserPair.hasOne(db.TrailRating, { foreignKey: "trailUserPairId" });
db.TrailRating.belongsTo(db.TrailUserPair, { foreignKey: "trailUserPairId" });

// A Review has one TrailRating
db.Review.hasOne(db.TrailRating, { foreignKey: "reviewId" } )
db.TrailRating.belongsTo(db.Review, { foreignKey: "reviewId" })


module.exports = db;
