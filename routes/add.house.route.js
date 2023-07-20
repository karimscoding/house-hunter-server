const express = require("express");
const {
  addHouse,
  getAllHouses,
  getHousesByOwner,
  getHouseById,
  updateHouse,
} = require("../controllers/houses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// add a new house
router.post("/add/houses", addHouse);

// get all house
router.get("/get/houses", getAllHouses);

// get house owner
router.get("/houses", getHousesByOwner);

// Update a house by its ID
router.get("/houses/:id", getHouseById);

router.patch("/houses/:id", updateHouse);

module.exports = router;
