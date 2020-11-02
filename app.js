const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models")

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.json({
        place: 'home'
    })
})
app.get('/store', (req, res, next) => {
    res.json({
        place: 'store'
    })
})


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
    .then(()=> {
        app.listen(PORT, () => {
            console.log('Connected on port', PORT)        
        })
    })
