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
    saveUninitialized: false,
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
const authRoutes = require("./routes/authRoutes");
const trailRoutes = require("./routes/trailRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/park", parkRoutes);
app.use("/search", searchRoutes);
app.use("/auth", authRoutes);
app.use("/trail", trailRoutes);
app.use("/reviews", reviewRoutes);


let user1, user2;
db.sequelize
  .sync()
  .then(() => {
    return TrailSessionStore.sync({ force: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected on port", PORT);
    });
  });
