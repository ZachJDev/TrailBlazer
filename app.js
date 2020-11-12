const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Database
const db = require("./models");

// Session Storage
const Sequelize = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { dbname, user, pw } = require("./models/dbConfig");
console.log(dbname)
const sequelize = new Sequelize(dbname, user, pw, {
  dialect: "mysql",
  storage: "./session.mysql",
});
const TrailSessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "asdf",
    store: TrailSessionStore,
    resave: false,
    proxy: true,
  })
);

// Express Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Routes
const parkRoutes = require("./routes/parkRoutes");
const searchRoutes = require("./routes/searchRoutes");
app.use("/park", parkRoutes);
app.use("/search", searchRoutes);

// This is mostly just some hardcoded testing data.

db.sequelize
  .sync({ force: true })
  .then(() => {
      return TrailSessionStore.sync();
  })
  .then(() => {
    return db.User.create({ name: "Bob" });
  })
  .then((user) => {
    return db.User.create({ name: "Greg" });
  })
  .then((user) => {
    return db.Comment.create({ userId: 1, text: "I Like Ham" });
  })
  .then((comment) => {
    return db.Comment.create({ userId: 2, text: "I Like Bread" });
  })
  .then((comment) => {
    return db.Reply.create({ commentId: comment.id, replyId: 1 });
  })
  .then((com) => {
    db.Park.create({
      name: "WibnerLund",
      zipCode: 43026,
      state: "OH",
      city: "Columbus",
    });
  })
  .then((pa) => {
    db.Park.create({
      name: "Zach",
      zipCode: 43026,
      state: "OH",
      city: "Columbus",
    });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected on port", PORT);
    });
  });
