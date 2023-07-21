const Bookings = require("../models/booking.model");
const User = require ("../models/user.model")

const createBooking = async (req, res) => {
  try {
    const { name, phone, email, house } = req.body;

    const newBooking = new Bookings({
      name,
      email,
      phone,
      house,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking Successful" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save the booking." });
  }
};

// Fetch user bookings from the database
const getUserBookings = async (req, res) => {
  try {
    const userEmail = req.user.email;

     // Fetch user by email to get the user's _id
    const user = await User.find({email: userEmail})

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const userBookings = await Bookings.find({ user: user._id }).populate(
      "house"
    );

    res.json({ userBookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch user bookings." });
  }
};

module.exports = { createBooking, getUserBookings };
