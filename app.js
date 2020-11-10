const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser")


const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
const parkRoutes = require('./routes/parkRoutes')
app.use('/park', parkRoutes)

db.sequelize.sync({force: true})

    .then(() => {
   return db.User.create({name: "Bob"})
    })
    .then((user) => {
    
    return db.User.create({name: "Greg"})
    })
    .then((user)=> {
        return db.Comment.create({userId: 1, text: "I Like Ham"})
    })
    .then(comment => {
      return db.Comment.create({userId: 2, text: "I Like Bread"})
    })
    .then(comment => {
        return db.Reply.create({commentId: comment.id, replyId: 1})
    })
    .then(com => {
        db.Park.create({name: "WibnerLund", zipCode: 43026})
    })
    .then(()=> {
        app.listen(PORT, () => {
            console.log('Connected on port', PORT)        
        })
    })
