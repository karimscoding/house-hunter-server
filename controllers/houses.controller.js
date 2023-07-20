const mongoose = require ("mongoose")
const House = require("../models/house.model");

const addHouse = async (req, res) => {
  //   Check if the user is a "house owner"
  //   if (req.role !== "house owner") {
  //     return res
  //       .status(403)
  //       .json({ message: "You are not authorized to add a house" });
  //   }

  try {
    const {
      name,
      address,
      city,
      availabilityDate,
      phone,
      bedrooms,
      bathrooms,
      roomSize,
      rentPerMonth,
      picture,
      description,
      owner,
    } = req.body;

    const ownerId = new mongoose.Types.ObjectId(owner);


    // Check if all required fields are present
    if (
      !name ||
      !address ||
      !city ||
      !availabilityDate ||
      !phone ||
      !bedrooms ||
      !bathrooms ||
      !roomSize ||
      !rentPerMonth ||
      !picture ||
      !description||
      !owner
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
        bathrooms,
        roomSize,
        rentPerMonth,
        picture,
        description,
        owner: ownerId
    });

    await newHouse.save();

    res.status(201).json({ message: "House added successfully" });


  } catch (error) {
    console.log("Error adding house", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all house
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    console.log("Error fetching houses", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {addHouse, getAllHouses};
