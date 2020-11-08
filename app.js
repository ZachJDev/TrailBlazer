// const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models")

app.use(express.urlencoded({ extended: false }))

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
