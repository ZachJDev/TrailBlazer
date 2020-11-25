const { Sequelize, Model, DataTypes } = require("sequelize");
const { dbname, user, pw, host, port } = require("./dbConfig");

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
db.Reply = require("./Replies")(sequelize, Sequelize);


// Before 11/24, I had onl had FKs fon the 'hasMany' relationship, which seems okay from the Squelize Docs
// However, that didn't seem to work correctly with trails/Parks, so I just added them all to both.

// User has Many Comments
db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId" });

// User has many reviews
db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Review.belongsTo(db.User, { foreignKey: "userId" });

// Park has many Trails
db.Park.hasMany(db.Trail, {foreignKey: 'parkId'});
db.Trail.belongsTo(db.Park, {foreignKey: 'parkId'});

// Trail has many Reviews
db.Trail.hasMany(db.Review, {foreignKey: 'trailId'});
db.Review.belongsTo(db.Trail, {foreignKey: 'trailId'});

// Review has many Comments
db.Review.hasMany(db.Comment, {foreignKey: 'reviewId'});
db.Comment.belongsTo(db.Review, {foreignKey: 'reviewId'});

//Comment has Many Replies
db.Comment.hasMany(db.Reply, {foreignKey: 'parentId'});
db.Reply.belongsTo(db.Comment, {foreignKey: 'parentId'});

module.exports = db;
