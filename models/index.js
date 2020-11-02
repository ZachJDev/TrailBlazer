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
db.Park = require("./Parks")(sequelize, Sequelize);
db.Trail = require("./Trails")(sequelize, Sequelize);
db.Review = require("./Reviews")(sequelize, Sequelize);
db.Reply = require("./Replies")(sequelize, Sequelize);

// User has Many Comments
db.User.hasMany(db.Comment, { foreignKey: "userId" });
db.Comment.belongsTo(db.User);

// User has many reviews
db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Review.belongsTo(db.User);

// Park has many Trails
db.Park.hasMany(db.Trail, {foreignKey: 'parkId'});
db.Trail.belongsTo(db.Park);

// Trail has many Reviews
db.Trail.hasMany(db.Review, {foreignKey: 'trailId'});
db.Review.belongsTo(db.Trail);

// Review has many Comments
db.Review.hasMany(db.Comment, {foreignKey: 'reviewId'});
db.Comment.belongsTo(db.Review);

//Comment has Many Replies
db.Comment.hasMany(db.Reply, {foreignKey: 'parentId'});
db.Reply.belongsTo(db.Comment);

module.exports = db;
