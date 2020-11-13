const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

router.get("/login", (req, res, next) => {
    req.session.isLoggedIn = true;
    console.log("Here")
    res.json({
        login: true
    })
})

module.exports = router