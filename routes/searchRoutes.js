const express = require('express')
const db = require("../models/index")
const router = express.Router({mergeParams: true})

const searchController =require('../controllers/searchController')

router.get("/:type", searchController.search)

module.exports = router;