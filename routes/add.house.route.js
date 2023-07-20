const express = require("express")
const addHouse = require("../controllers/houses.controller")
const router = express.Router()

// add a new house
router.post("/add/houses", addHouse)

module.exports = router