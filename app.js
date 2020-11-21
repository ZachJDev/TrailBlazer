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

const sequelize = new Sequelize(dbname, user, pw, {
  dialect: "mysql",
  storage: "./session.mysql",
});
const TrailSessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: JSON.parse(process.env.SECRET),
    store: TrailSessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false
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
const authRoutes = require("./routes/authRoutes")
app.use("/park", parkRoutes);
app.use("/search", searchRoutes);
app.use("/auth", authRoutes)

// This is mostly just some hardcoded testing data.

db.sequelize
  .sync({ force: true })
  .then(() => {
      return TrailSessionStore.sync({ force: true });
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
      address: "302 Kerzy Street",
      zipCode: 43026,
      state: "OH",
      city: "Columbus",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Eget lorem dolor sed viverra ipsum. Sagittis orci a scelerisque purus. Aliquet nibh praesent tristique magna sit amet purus gravida. Facilisi nullam vehicula ipsum a arcu cursus. Quis blandit turpis cursus in hac habitasse platea dictumst. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Venenatis cras sed felis eget velit. Nibh sit amet commodo nulla facilisi. Dui vivamus arcu felis bibendum ut tristique et egestas. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Orci ac auctor augue mauris augue neque gravida. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Hendrerit dolor magna eget est lorem ipsum dolor. Adipiscing enim eu turpis egestas pretium. Nibh nisl condimentum id venenatis a. Turpis massa sed elementum tempus egestas sed sed risus."
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
