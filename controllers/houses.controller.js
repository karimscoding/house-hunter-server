const mongoose = require("mongoose");
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
      !description ||
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
      owner: ownerId,
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

// get house
const getHousesByOwner = async (req, res) => {
  try {
    const ownerId = req.userId;
    console.log("owner",ownerId);

    const houses = await House.find({owner: ownerId});
    res.status(200).json(houses);
  } catch (error) {
    console.log("Error fetching houses", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update house
const updateHouse = async (req, res) => {
  try {
    const houseId = req.params.id;
    const updatedData = req.body;
    const updatedHouse = await House.findByIdAndUpdate(houseId, updatedData, {
      new: true,
    });

    if (!updatedHouse) {
      return res.status(404).json({ message: "House not found" });
    }

    res.status(200).json(updatedHouse);
  } catch (error) {
    console.log("Error updating house", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get house by id
const getHouseById = async (req, res) => {
  try {
    const houseId = req.params.id;
    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    res.status(200).json(house);
  } catch (error) {
    console.log("Error fetching house by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a house by its ID
const deleteHouse = async (req, res) => {
  try {
    const houseId = req.params.id;
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      return res.status(404).json({ message: "House not found" });
    }

    res.status(200).json({ message: "House deleted successfully" });
  } catch (error) {
    console.log("Error deleting house", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addHouse, getAllHouses, getHousesByOwner, getHouseById, updateHouse, deleteHouse };
