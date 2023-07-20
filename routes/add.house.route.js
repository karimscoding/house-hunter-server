const express = require("express")
const {addHouse, getAllHouses} = require("../controllers/houses.controller")
const router = express.Router()

// add a new house
router.post("/add/houses", addHouse)

// get all house 
router.get("/get/houses", getAllHouses);

module.exports = router