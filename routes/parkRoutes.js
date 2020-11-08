const express = require('express')
const {Sequelize} = require("sequelize");
const db = require("../models/index")


const router = express.Router({mergeParams: true})

router.get('/:parkId', (req, res, next) => {
    db.Park.findOne({where: {parkId : 1}})
    .then(park => {
        console.log(park)
        if(park !== null){
             res.json(park.dataValues)
             console.log('good')
            }
        else{
             res.status(404).send('')
             console.log('erroed')
            }
    })

}) 


module.exports = router;