// houses.controller.js
const House = require("../models/house.model");

const updateHouse = async (req, res) => {
  try {
    const houseId = req.params.id;
    const ownerId = req.user._id;

    // Find the house by ID and owner ID to ensure the user has permission to update
    const house = await House.findOne({ _id: houseId, owner: ownerId });

    if (!house) {
      return res.status(404).json({ message: "House not found or not authorized to update" });
    }

    // Update the house data with the new values from the request body
    house.name = req.body.name;
    house.address = req.body.address;
    house.city = req.body.city;
    house.availabilityDate = req.body.availabilityDate;
    house.phone = req.body.phone;
    house.bedrooms = req.body.bedrooms;
    house.bathrooms = req.body.bathrooms;
    house.roomSize = req.body.roomSize;
    house.rentPerMonth = req.body.rentPerMonth;
    house.picture = req.body.picture;
    house.description = req.body.description;

    // Save the updated house to the database
    const updatedHouse = await house.save();

    res.status(200).json(updatedHouse);
  } catch (error) {
    console.log("Error updating house:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateHouse,
};
