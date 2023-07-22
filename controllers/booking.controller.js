const Bookings = require("../models/booking.model");
const User = require("../models/user.model");

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
    const userBookings = await Bookings.find({ email: userEmail });

    if (!userBookings) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ userBookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch user bookings." });
  }
};

// delete user booking
const deleteUserBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // find the booking by id
    const booking = await Bookings.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }

    res.status(201).json( { message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user bookings" });
  }
};

module.exports = { createBooking, getUserBookings, deleteUserBooking };
