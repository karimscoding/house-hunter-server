const express = require("express");
const router = express.Router();
const House = require("../models/houseModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/houses", async (req, res) => {
  console.log("Request received to /houses");

  // Check if the user is a "house owner"
  if (req.role !== "House Owner") {
    return res
      .status(403)
      .json({ message: "You are not authorized to add a house" });
  }

  try {
    const {
      name,
      address,
      city,
      availabilityDate,
      phone,
      bedrooms,
      roomSize,
      rentPerMonth,
      picture,
      description,
    } = req.body;

    // Check if all required fields are present
    if (
      !name ||
      !address ||
      !city ||
      !availabilityDate ||
      !phone ||
      !bedrooms ||
      !roomSize ||
      !rentPerMonth ||
      !picture ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new house document
    const newHouse = new House({
      name,
      address,
      city,
      availabilityDate,
      phone,
      bedrooms,
      roomSize,
      rentPerMonth,
      picture,
      description,
    });

    await newHouse.save();

    res.status(201).json({ message: "House added successfully" });
  } catch (error) {
    console.log("❌Error adding house", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/houses", async (req, res) => {
  try {
    const houses = await House.find({ owner: req.userId });
    res.status(200).json(houses);
  } catch (error) {
    console.log("❌Error fetching houses", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
