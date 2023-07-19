const express = require("express");
const router = express.Router();
const House = require("../models/houseModel");

router.post("/houses", async (req, res) => {
  try {
    // TODO: add authentications middleware

    // const userId = req.user.id;
    const {
      name,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      picture,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description,
    } = req.body;

    if (
      !name ||
      !address ||
      !city ||
      !bedrooms ||
      !bathrooms ||
      !roomSize ||
      !picture ||
      !availabilityDate ||
      !rentPerMonth ||
      !phoneNumber ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // create a new house document
    const newHouse = new House({
      // owner: userId,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      picture,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description,
    });

    await newHouse.save();
    res.status(201).json({ message: "House added successfully" });
  } catch (error) {
    console.log("❌Error adding house", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
