const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path') // Only needed for build

const app = express();
const PORT = process.env.PORT || 3001;

// Database
const db = require("./models");

// Session Storage
const Sequelize = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { dbname, user, pw } = require("./configs/dbConfig");

const sequelize = new Sequelize(dbname, user, pw, {
  dialect: "mysql",
  storage: "./session.mysql",
});
const TrailSessionStore = new SequelizeStore({
  db: sequelize,
});

// noinspection SpellCheckingInspection
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

// For serving the build.
// app.use(express.static(path.join(__dirname, '/client/build')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
// })

//Routes
const Routes = require("./configs/routeConfig");
app.use(Routes.API_PREFIX, require("./routes/api"));

db.sequelize
  .sync()
  .then(() => {
    return TrailSessionStore.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected on port", PORT);
    });
  });
