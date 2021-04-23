const express = require("express");
// const methodOverride = require("method-override");
const bodyParser = require("body-parser");
// const path = require('path') Only needed for build

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
// app.use(methodOverride("_method")); I don't think I need this anymore...


// For serving the build.
// app.use(express.static(path.join(__dirname, '/client/build')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
// })

//Routes
const parkRoutes = require("./routes/parkRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");
const trailRoutes = require("./routes/trailRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/park", parkRoutes);
app.use("/search", searchRoutes);
app.use("/auth", authRoutes);
app.use("/trail", trailRoutes);
app.use("/reviews", reviewRoutes);
app.use("/ratings", ratingRoutes);
app.use("/comments", commentRoutes);


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
